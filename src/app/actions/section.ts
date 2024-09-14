'use server';
import { prisma } from '@/db';
import { Section, SectionFormData } from '@/types/section';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

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

export const createSection = async (formData: FormData) => {
  const section = {
    title: formData.get('title') as string,
    projectId: formData.get('projectUUID') as string,
    contentType: formData.get('contentType') as string,
    content: formData.get('content'),
  } as Section;

  section.uuid = uuidv4();

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

    return [section];
  }
};
