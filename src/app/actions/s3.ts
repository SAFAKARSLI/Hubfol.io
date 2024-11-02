import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { s3Client } from '@/aws/s3';
import { Prisma } from '@prisma/client';
import { Image } from '@/types/section';
import { InputJsonArray, InputJsonValue } from '@prisma/client/runtime/library';
import { Metadata } from 'libphonenumber-js';

export const uploadFile = async (file: File, bucketName: string) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const body = Buffer.from(arrayBuffer);
    const uniqueKey = `${uuidv4()}-${new Date().getTime()}`;

    const uploadParams = {
      Bucket: bucketName,
      Key: uniqueKey,
      Body: body,
      Metadata: {
        fileName: file.name,
      },
    };

    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    console.log('S3 CLIENT FILE', data);
    return {
      status: 200,
      data: `${uniqueKey}`,
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { status: 500, message: 'Error uploading file.' };
  } finally {
    await s3Client.destroy();
  }
};

export const deleteFile = async (identifer: string, bucketName: string) => {
  const deleteParams = {
    Bucket: bucketName,
    Key: identifer,
  };

  await s3Client.send(new DeleteObjectCommand(deleteParams));
};

export const eliminateUnusedFiles = async (
  prevFileList: Image[],
  newFileList: Image[],
  bucketName: string
) => {
  const newUrlList = newFileList
    .filter((file) => file.url)
    .map((file) => file.url);

  const filesToDelete = prevFileList.filter(
    (file) => !newUrlList.includes(file.url as string)
  );
  for (const file of filesToDelete) {
    await deleteFile(file.url?.split('/').pop() as string, bucketName);
  }
};
