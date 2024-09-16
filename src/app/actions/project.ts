'use server';

import { s3Client } from '@/aws/s3';
import Project from '@/types/project';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { validateUUID } from './utils';
import { cookies } from 'next/headers';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { prisma } from '@/db';
import { Content } from '@prisma/client';
import { InputJsonValue } from '@prisma/client/runtime/library';
import { NextApiRequest } from 'next';
import { baseUrl } from '@/utils';
import { Section } from '@/types/section';
import { revalidatePath } from 'next/cache';

const bucketName = process.env.AWS_PROJECT_ICONS_BUCKET_NAME as string;

export const initiateProject = async (userUUID: string) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error('You must be signed in to do that.');
  }

  if (session.user.uuid != userUUID) throw new Error('Not authorized.');

  const projectUUID = uuidv4();
  cookies().set('pUUID', projectUUID);

  const date = new Date();
  const sections = [
    {
      title: 'Project Description',
      createdAt: date,
      updatedAt: date,
      uuid: uuidv4() as string,
      isActive: true,
      contentType: Content.TEXT,
      content: 'This is the project description.' as InputJsonValue,
    },
    {
      title: 'Tech Stack',
      createdAt: date,
      updatedAt: date,
      uuid: uuidv4() as string,
      isActive: true,
      contentType: Content.BRAND_STACK,
      content: ['nextdotjs', 'typescript', 'tailwindcss'] as InputJsonValue,
    },
  ] as Section[];

  try {
    await prisma.project.create({
      data: {
        uuid: projectUUID,
        ownerId: session.user.uuid,
        createdAt: date,
        name: 'New Project',
        url: `${baseUrl}/api/void`,
        tagline: '',
        iconLink: '',
        sections: {
          createMany: {
            data: sections,
          },
        },
      },
    });
  } catch (error) {
    console.error('Error creating sections:', error);
  } finally {
    await prisma.$disconnect();
    revalidatePath(`/u/${userUUID}/projects`);
    redirect(`/u/${userUUID}/projects/initiate`);
  }
};

export const createInitiatedProject = async (
  ownerId: string,
  formData: FormData
) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error('You must be signed in to perform this action.');
  }

  if (ownerId !== session.user.uuid) throw new Error('Not authorized.');
  if (!validateUUID(ownerId))
    throw new Error('Invalid project owner provided.');

  if (!cookies().get('pUUID'))
    throw new Error('An error occured while creating the project.');

  const uuid = cookies().get('pUUID')!.value;
  const project = {
    name: formData.get('name') as string,
    url: formData.get('url') as string,
    iconLink: formData.get('iconLink') as string,
    tagline: formData.get('tagline') as string,
    createdAt: new Date(),
    ownerId,
    uuid,
  };

  // const schema = z.object({
  //   title: z
  //     .string()
  //     .min(1, { message: 'Title must be at least 1 character long.' }),
  //   url: z
  //     .string()
  //     .url({ message: "Invalid URL (Must include 'http://' or 'https://')" }),
  //   tagline: z.string().optional(),
  //   iconLink: z.string().url().optional(),
  // });

  // const parse = schema.safeParse(project);

  // const errors = [] as string[];

  // if (!parse.success) {
  //   parse.error.errors.forEach((err) => {
  //     errors.push(`${err.path.join(' -> ')}: ${err.message}`);
  //   });
  // } else {
  try {
    await prisma.project.update({ where: { uuid }, data: project });
    console.log('Project updated successfully');
  } catch (error) {
    // errors.push('Failed to create project');
  } finally {
    await prisma.$disconnect();
  }
  revalidatePath(`/u/${ownerId}/projects`);
  redirect(`/u/${ownerId}/projects`);
  // }
  // return [project, errors];
};

export const deleteProject = async (projectUUID: string, userUUID: string) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error('You must be signed in to do that.');
  }
  if (session.user.uuid !== userUUID) throw new Error('Not authorized.');

  await prisma.project.delete({
    where: { uuid: projectUUID },
  });
  revalidatePath(`/u/${userUUID}/projects`);
  redirect(`/u/${userUUID}/projects`);
};

export const uploadProjectIcon = async (formData: FormData) => {
  const iconLink = formData.get('iconLink');

  if (iconLink && iconLink instanceof File) {
    const arrayBuffer = await iconLink.arrayBuffer();
    const body = Buffer.from(arrayBuffer);

    const uniqueKey = `${uuidv4()}-${new Date().getTime()}`;

    const uploadParams = {
      Bucket: bucketName,
      Key: uniqueKey,
      Body: body,
    };

    await s3Client.send(new PutObjectCommand(uploadParams));
    return `https://s3.amazonaws.com/${bucketName}/${uniqueKey}`;
  } else {
    throw new Error('Invalid iconLink');
  }
};

export const deleteProjectIcon = async (iconLink: string) => {
  if (iconLink) {
    const key = iconLink.split('/').slice(-1)[0];

    const deleteParams = {
      Bucket: bucketName,
      Key: key,
    };

    await s3Client.send(new DeleteObjectCommand(deleteParams));
  }
};

export const getProjectIcon = async (iconLink: string) => {
  const key = iconLink.split('/').slice(-1)[0];

  const getParams = {
    Bucket: bucketName,
    Key: '1123',
  };

  try {
    const data = await s3Client.send(new GetObjectCommand(getParams));
    return data.Body;
  } catch (error) {
    return 'Icon not found';
  }
};
