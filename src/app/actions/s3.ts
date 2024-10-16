import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { s3Client } from '@/aws/s3';
import { Prisma } from '@prisma/client';
import { Image } from '@/types/section';
import { InputJsonArray, InputJsonValue } from '@prisma/client/runtime/library';

export const uploadFile = async (file: File, bucketName: string) => {
  console.log('Uploading file:', file);
  try {
    const arrayBuffer = await file.arrayBuffer();
    const body = Buffer.from(arrayBuffer);

    const uniqueKey = `${uuidv4()}-${new Date().getTime()}`;

    const uploadParams = {
      Bucket: bucketName,
      Key: uniqueKey,
      Body: body,
    };

    await s3Client.send(new PutObjectCommand(uploadParams));
    return {
      status: 200,
      data: `https://s3.amazonaws.com/${bucketName}/${uniqueKey}`,
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
  console.log('Previous file list:', prevFileList);
  console.log('New file list:', newFileList);

  const newUrlList = newFileList
    .filter((file) => file.url)
    .map((file) => file.url);

  const filesToDelete = prevFileList.filter(
    (file) => !newUrlList.includes(file.url as string)
  );
  console.log('Files to delete:', filesToDelete);
  for (const file of filesToDelete) {
    await deleteFile(file.url?.split('/').pop() as string, bucketName);
  }
};
