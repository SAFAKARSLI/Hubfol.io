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
import { auth, User } from '@clerk/nextjs/server';
import { revalidateTag } from 'next/cache';
import { getUser } from './user';
import { nanoid } from 'nanoid';
import { generateProjectSlug } from '@/utils';
import _ from 'lodash';
import { uploadFile } from './s3';

export const initiateProject = async (formData: FormData) => {
  const session = auth();
  session.protect();
  const { userId } = session;
  const user = await getUser(userId!);

  const username = formData.get('username') as string;

  if (user?.username != username)
    return { status: 403, message: 'Not authorized.' };

  const date = new Date();
  const projectUUID = uuidv4();
  const name = 'New Project';
  const { hubfolioUserId } = user.privateMetadata;
  try {
    const initiatedProject = await prisma.project.create({
      data: {
        slug: generateProjectSlug(name),
        uuid: projectUUID,
        ownerId: hubfolioUserId as string,
        createdAt: date,
        name,
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
    redirect(
      `/u/${username}/projects/edit/${projectUUID}/general-information?initialize=true`
    );
  }
};

export const checkForAuthority = async (
  projectUUID: string,
  userUUID: string
) => {
  try {
    const project = await prisma.project.findUnique({
      where: { uuid: projectUUID, ownerId: userUUID },
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
  const session = auth();
  session.protect();

  var iconLink = '';
  if ((formData.get('iconLink') as File).size != 0) {
    iconLink = (
      await uploadFile(
        formData.get('iconLink') as File,
        process.env.AWS_PROJECT_ICONS_BUCKET_NAME as string
      )
    ).data as string;
  }

  const projectFromFormData = {
    name: formData.get('name') as string,
    url: formData.get('url') as string,
    tagline: formData.get('tagline') as string,
    iconLink,
    slug: generateProjectSlug(formData.get('name') as string),
  };
  const projectUUID = formData.get('uuid') as string;

  // If the project previously created, check if any of the field have changed.
  // If not, bypass the update
  if (formData.get('prev-project')) {
    const prevProject = JSON.parse(
      formData.get('prev-project') as string
    ) as typeof projectFromFormData;

    const keys = Object.keys(
      projectFromFormData
    ) as (keyof typeof projectFromFormData)[];

    const noChange = keys.every((key) =>
      _.isEqual(projectFromFormData[key], prevProject[key])
    );

    if (noChange) {
      return { status: 200, message: 'No changes detected.' };
    }
  }

  if (projectUUID != null && !validateUUID(projectUUID))
    return { status: 400, message: 'Invalid project identifier provided.' };

  const user = await getUser(session.userId!);
  const { hubfolioUserId } = user?.privateMetadata!;

  const authorityCheck = await checkForAuthority(
    projectUUID,
    hubfolioUserId as string
  );
  if (authorityCheck.status != 200) return authorityCheck;

  try {
    const resultingProject = await prisma.project.update({
      where: { uuid: projectUUID },
      data: {
        ...projectFromFormData,
      },
    });
    return { status: 200, data: resultingProject };
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

export const deleteProject = async (projectUUID: string) => {
  const session = auth();
  session.protect();

  let userUUID: string | undefined;
  const user = (await getUser(session.userId!)) as User;
  try {
    const projectFromDb = await prisma.project.findUnique({
      where: { uuid: projectUUID },
    });

    if (!projectFromDb) {
      return { status: 404, message: 'Project not found.' };
    }

    const { hubfolioUserId } = user.privateMetadata;

    if (projectFromDb.ownerId !== hubfolioUserId) {
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
    redirect(`/u/${user.username}/projects`);
  }
};
