'use server';
import { prisma } from '@/db';
import { Content, Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { validateUUID } from './utils';
import { extractUUID } from '@/utils';
import { checkForAuthority } from './project';
import { revalidateTag } from 'next/cache';

export const upsertSections = async (formData: FormData) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return {
      status: 401,
      message: 'You must be logged in to create a section.',
    };
  }

  const projectId = formData.get('projectId') as string;

  const authorityCheck = await checkForAuthority(projectId, session);
  if (authorityCheck.status !== 200) {
    return authorityCheck;
  }

  const sectionInfo = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    contentType: formData.get('contentType') as Content,
    content: formData.get('content') as Prisma.InputJsonValue,
  };
  const sectionUUID = formData.get('uuid') as string;

  let resultingSection;
  try {
    if (!sectionUUID) {
      resultingSection = await prisma.section.create({
        data: {
          uuid: uuidv4(),
          ...sectionInfo,
          projectId,
        },
      });
    } else
      resultingSection = await prisma.section.update({
        where: { uuid: sectionUUID },
        data: {
          ...sectionInfo,
        },
      });
  } catch (error) {
    console.error('Error updating section:', error);
    return {
      status: 500,
      message: 'Failed to update/create section',
    };
  } finally {
    await prisma.$disconnect;
    revalidateTag('sections');
    return { status: 200, data: resultingSection };
  }
};

export const initiateSection = async (projectUUID: string) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return {
      status: 401,
      message: 'You must be logged in to initiate a section.',
    };
  }

  try {
    const project = await prisma.project.findUnique({
      where: { uuid: projectUUID, ownerId: session.user.uuid },
    });

    if (!project) {
      return { status: 404, message: 'Project not found.' };
    }
  } catch (error) {
    console.error('Error initiating section:', error);
  }

  try {
    const section = await prisma.section.create({
      data: {
        uuid: uuidv4(),
        projectId: projectUUID,
        title: 'New Section',
        contentType: Content.TEXT,
        content: '',
      },
    });
    return { status: 200, data: section };
  } catch (error) {
    console.error('Error initiating section:', error);
  } finally {
    prisma.$disconnect();
  }
};

export const getSections = async (projectUUID: string) => {
  try {
    const sections = await prisma.section.findMany({
      where: { projectId: projectUUID },
      select: { title: true, content: true, contentType: true },
    });
    return JSON.parse(JSON.stringify(sections));
  } catch (error) {
    console.error('Error fetching sections:', error);
  } finally {
    prisma.$disconnect();
  }
};

export const getSection = async (sectionUUID: string) => {
  try {
    const section = await prisma.section.findUnique({
      where: { uuid: sectionUUID },
    });
    return JSON.parse(JSON.stringify(section));
  } catch (error) {
    console.error('Error fetching section:', error);
  } finally {
    prisma.$disconnect();
  }
};

export const getSectionCount = async () => {
  try {
    const count = await prisma.section.count();
    return count;
  } catch (error) {
    console.error('Error fetching section count:', error);
  } finally {
    prisma.$disconnect();
  }
};

export const createSection = async (
  formData: FormData,
  { request }: { request: Request }
) => {
  const session = await getServerSession(authOptions);

  if (request.method !== 'POST') throw new Error('Invalid request method.');

  if (!session || !session.user) {
    throw new Error('You must be logged in to create a section.');
  }

  const userUUID = extractUUID(request.url, 'users');
  if (!userUUID || !validateUUID(userUUID))
    throw new Error('Invalid user identifier provided: ' + userUUID);

  if (userUUID !== session.user.uuid) {
    throw new Error('Not authorized to create a section for this user.');
  }

  const section = {
    uuid: uuidv4(),
    title: formData.get('title') as string,
    projectId: formData.get('projectUUID') as string,
    contentType: formData.get('contentType') as Content,
    content: formData.get('content') as Prisma.InputJsonValue,
  };

  const schema = z.object({
    title: z
      .string()
      .min(1, { message: 'Title must be at least 1 character long.' }),
    projectUUID: z.string(),
  });

  const parse = schema.safeParse(section);

  const errors = [] as string[];

  if (!parse.success) {
    parse.error.errors.forEach((err) => {
      errors.push(err.message);
    });
    return errors;
  }

  try {
    await prisma.section.create({ data: section });
  } catch (error) {
    console.error('Error creating section:', error);
    errors.push('Failed to create section');
  } finally {
    await prisma.$disconnect;
    return section;
  }
};

export const deleteSection = async (formData: FormData) => {
  const session = await getServerSession(authOptions);

  const sectionUUID = formData.get('uuid') as string;

  if (!session || !session.user) {
    return {
      status: 401,
      message: 'You must be logged in to delete a section.',
    };
  }
  const section = await prisma.section.findUnique({
    where: { uuid: sectionUUID },
    select: { projectId: true },
  });

  if (!section) {
    return { status: 404, message: 'Section not found.' };
  }

  const authorityCheck = await checkForAuthority(section.projectId, session);

  if (authorityCheck.status !== 200) {
    return authorityCheck;
  }

  try {
    await prisma.section.delete({
      where: { uuid: sectionUUID },
    });
  } catch (error) {
    console.error('Error deleting section:', error);
  } finally {
    revalidateTag('sections');
    await prisma.$disconnect;
  }
};
