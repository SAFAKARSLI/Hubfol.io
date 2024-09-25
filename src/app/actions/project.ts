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
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { prisma } from '@/db';
import { Content, Employee } from '@prisma/client';
import { InputJsonValue } from '@prisma/client/runtime/library';
import { baseUrl } from '@/utils';
import { Section } from '@/types/section';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

const bucketName = process.env.AWS_PROJECT_ICONS_BUCKET_NAME as string;

export const createProject = async (formData: FormData) => {
  console.log(formData);
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error('You must be signed in to do that.');
  }

  const iconLink = (await uploadProjectIcon(formData.get('iconLink') as File))
    .data as string;

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
    return { status: 401, message: 'You must be signed in to do that.' };
  }

  if (session.user.uuid != userUUID)
    return { status: 403, message: 'Not authorized.' };

  const date = new Date();

  try {
    const initiatedProject = await prisma.project.create({
      data: {
        uuid: uuidv4(),
        ownerId: session.user.uuid,
        createdAt: date,
        name: 'New Project',
        url: '',
        tagline: '',
        iconLink: '',
      },
    });

    return { status: 200, data: initiatedProject };
  } catch (error) {
    console.error('Error creating sections:', error);
    throw new Error('Internal Server Error. Failed to create project.');
  } finally {
    await prisma.$disconnect();
    revalidateTag('projects');
  }
};

const checkForAuthority = async (
  projectUUID: string,
  session: Session | null
) => {
  if (!session || !session.user) {
    return { status: 401, message: 'You must be signed in to do that.' };
  }

  if (projectUUID == null) {
    return { status: 201, message: 'Uninitiated project.' };
  }

  try {
    const project = await prisma.project.findUnique({
      where: { uuid: projectUUID, ownerId: session.user.uuid },
    });
    if (!project) {
      return { status: 403, message: 'Not authorized.' };
    }
    return { status: 200 };
  } catch (error) {
    return { status: 500, message: 'Internal Server Error.' };
  } finally {
    await prisma.$disconnect();
  }
};

export const upsertGeneralInfo = async (formData: FormData) => {
  const session = await getServerSession(authOptions);
  const iconLink = (await uploadProjectIcon(formData.get('iconLink') as File))
    .data as string;
  console.log('iconLink', iconLink);
  const projectFromFormData = {
    name: formData.get('name') as string,
    url: formData.get('url') as string,
    tagline: formData.get('tagline') as string,
    iconLink,
  };
  const projectUUID = formData.get('projectUUID') as string;

  if (projectUUID != null && !validateUUID(projectUUID))
    return { status: 400, message: 'Invalid project identifier provided.' };

  const authorityCheck = await checkForAuthority(projectUUID, session);

  try {
    if (authorityCheck.status == 200) {
      const resultingProject = await prisma.project.update({
        where: { uuid: projectUUID },
        data: {
          ...projectFromFormData,
        },
      });
      return { status: 200, data: resultingProject };
    } else {
      return authorityCheck;
    }
  } catch (error) {
    console.error('Error updating project:', error);
    throw new Error(
      'Internal Server Error. An error occurred while updating the project.'
    );
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
    return {
      status: 401,
      message: 'You must be signed in to perform this action.',
    };
  }
  if (project.ownerId !== session.user.uuid)
    return { status: 403, message: 'Not authorized.' };

  if (!validateUUID(project.ownerId))
    return { status: 400, message: 'Invalid project identifier provided.' };

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
    throw new Error('An error occurred while creating the project.');
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
  if (!session || !session.user)
    return {
      status: 401,
      message: 'You must be signed in to do that.',
    };

  let userUUID: string | undefined;

  try {
    const projectFromDb = await prisma.project.findUnique({
      where: { uuid: projectUUID },
    });

    if (!projectFromDb) {
      return { status: 404, message: 'Project not found.' };
    }

    if (projectFromDb.ownerId !== session.user.uuid) {
      return { status: 403, message: 'Not authorized.' };
    }

    userUUID = projectFromDb.ownerId;

    await prisma.project.delete({
      where: { uuid: projectUUID },
    });
  } catch (error) {
    throw new Error(
      'Internal Server Error. An error occured while deleting the project.'
    );
  } finally {
    revalidateTag('projects');
    redirect(`/u/${userUUID}/projects`);
  }
};

export const uploadProjectIcon = async (file: File) => {
  if (file.size != 0) {
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
  } else {
    return { status: 201, data: '' };
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

// export const getProjectIcon = async (iconLink: string) => {
//   const key = iconLink.split('/').slice(-1)[0];

//   const getParams = {
//     Bucket: bucketName,
//     Key: '1123',
//   };

//   try {
//     const data = await s3Client.send(new GetObjectCommand(getParams));
//     return data.Body;
//   } catch (error) {
//     return 'Icon not found';
//   }
// };
