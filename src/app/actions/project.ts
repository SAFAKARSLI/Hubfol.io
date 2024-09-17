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
import { Content, Employee } from '@prisma/client';
import { InputJsonValue } from '@prisma/client/runtime/library';
import { baseUrl } from '@/utils';
import { Section } from '@/types/section';
import { revalidatePath, revalidateTag } from 'next/cache';
import { UploadIcon } from '@radix-ui/react-icons';

const bucketName = process.env.AWS_PROJECT_ICONS_BUCKET_NAME as string;

export const createProject = async (formData: FormData) => {
  console.log(formData);
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error('You must be signed in to do that.');
  }

  const iconLink = await uploadProjectIcon(formData.get('iconLink') as File);
  console.log('[actions/projects] iconLink', iconLink);

  const projectFromFormData = {
    name: formData.get('name') as string,
    url: formData.get('url') as string,
    iconLink,
    tagline: formData.get('tagline') as string,
    createdAt: new Date(),
    ownerId: session.user.uuid,
    uuid: uuidv4(),
  };

  // const schema = z.object({
  //   name: z.string().min(1, { message: 'Name is required.' }),
  //   url: z.string().url({ message: 'Invalid URL.' }),
  //   tagline: z.string().optional(),
  //   iconLink: z.string().url().optional(),
  // });

  // const parse = schema.safeParse(projectFromFormData);

  // const errors = [] as string[];

  // if (!parse.success) {
  //   parse.error.errors.forEach((err) => {
  //     errors.push(`${err.path.join(' -> ')}: ${err.message}`);
  //   });
  //   return { errors };
  // }

  try {
    await prisma.project.create({
      data: projectFromFormData,
    });
  } catch (error) {
    // errors.push('Failed to create project');
  } finally {
    await prisma.$disconnect();
  }

  revalidateTag('projects');
  redirect(`/u/${session.user.uuid}/projects/${projectFromFormData.uuid}`);
};

export const initiateProject = async (userUUID: string) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error('You must be signed in to do that.');
  }

  if (session.user.uuid != userUUID) throw new Error('Not authorized.');

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
    const initiatedProject = await prisma.project.create({
      data: {
        uuid: uuidv4(),
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
      include: { sections: true },
    });

    return initiatedProject;
  } catch (error) {
    console.error('Error creating sections:', error);
  } finally {
    await prisma.$disconnect();
    revalidateTag('projects');
  }
};

export const createInitiatedProject = async (
  project: Project,
  formData: FormData
) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error('You must be signed in to perform this action.');
  }

  if (project.ownerId !== session.user.uuid) throw new Error('Not authorized.');
  if (!validateUUID(project.ownerId))
    throw new Error('Invalid project owner provided.');

  const projectFromFormData = {
    name: formData.get('name') as string,
    url: formData.get('url') as string,
    iconLink: formData.get('iconLink') as string,
    tagline: formData.get('tagline') as string,
    createdAt: new Date(),
    ownerId: project.ownerId,
    uuid: project.uuid,
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
    await prisma.project.upsert({
      where: { uuid: project.uuid },
      create: projectFromFormData,
      update: projectFromFormData,
    });
  } catch (error) {
    // errors.push('Failed to create project');
  } finally {
    await prisma.$disconnect();
    revalidateTag('projects');
    // redirect(`/u/${project.ownerId}/projects/${project.uuid}`);
  }

  // }
  // return [project, errors];
};

export const deleteProject = async (projectUUID: string) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error('You must be signed in to do that.');
  }

  let userUUID: string | undefined;

  try {
    const projectFromDb = (await fetch(
      `${baseUrl}/api/projects/${projectUUID}`
    ).then((res) => res.json())) as Project;

    userUUID = projectFromDb.ownerId;

    if (session.user.uuid !== userUUID) throw new Error('Not authorized.');

    await prisma.project.delete({
      where: { uuid: projectUUID },
    });
  } catch (error) {
    throw new Error('An error occured while deleting the project.');
  } finally {
    revalidateTag('projects');
    redirect(`/u/${userUUID}/projects`);
  }
};

export const uploadProjectIcon = async (file: File) => {
  if (file) {
    const arrayBuffer = await file.arrayBuffer();
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
    throw new Error('Invalid icon data provided.');
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
