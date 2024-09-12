'use server';

import client from '@/db';
import Project from '@/types/project';
import { signIn, signOut } from 'next-auth/react';
import { s3Client } from '@/aws/s3';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import {
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { url } from 'inspector';
import { Section } from '@radix-ui/themes';

const bucketName = process.env.AWS_PROJECT_ICONS_BUCKET_NAME as string;
const db = client.db(process.env.DB_NAME as string);

export const logIn = async (userUUID: string) => {
  await signIn('google', { callbackUrl: `/users/${userUUID}/projects` });
};

export const logOut = async (userUUID: string) => {
  await signOut({ callbackUrl: `/users/${userUUID}/projects` });
};

export const getProjects = async (userUUID: string) => {
  await client.connect();
  const projects = await db
    .collection('projects')
    .find({ ownerId: userUUID }, { projection: { _id: 0 } })
    .toArray();

  return JSON.parse(JSON.stringify(projects));
};

export const getProject = async (projectUUID: string) => {
  await client.connect();
  const project = await db
    .collection('projects')
    .findOne({ projectUUID }, { projection: { _id: 0 } });
  return JSON.parse(JSON.stringify(project));
};

export const getProjectCount = async () => {
  await client.connect();
  const count = await db.collection('projects').countDocuments();
  return count;
};

export const createProject = async (
  formData: FormData
): Promise<(Project | string[])[]> => {
  const project = {
    title: formData.get('title') as string,
    url: formData.get('url') as string,
    sections: JSON.parse(formData.get('sections') as string),
  } as Project;

  // project.ownerId = userUUID;
  project.projectUUID = uuidv4();

  const schema = z.object({
    title: z
      .string()
      .min(1, { message: 'Title must be at least 1 character long.' }),
    url: z
      .string()
      .url({ message: "Invalid URL (Must include 'http://' or 'https://')" }),
    sections: z
      .array(
        z.object({
          title: z
            .string()
            .min(1, { message: 'Section header cannot be empty.' }),
        })
      )
      .min(1),
  });

  const parse = schema.safeParse(project);

  const errors = [] as string[];

  if (!parse.success) {
    parse.error.errors.forEach((err) => {
      errors.push(`${err.path.join(' -> ')}: ${err.message}`);
    });
    console.log(errors);
  }

  return [project, errors];

  // try {
  //   await client.connect();
  //   await db.collection('projects').insertOne(project);
  //   revalidatePath(`/users/${userUUID}/projects`);
  //   redirect(`/users/${userUUID}/projects/${project.projectUUID}`);
  // } catch (error) {
  //   throw new Error('Failed to create project');
  // } finally {
  //   client.close();
  // }
};

export const uploadIcon = async (formData: FormData) => {
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

export const deleteIcon = async (iconLink: string) => {
  if (iconLink) {
    const key = iconLink.split('/').slice(-1)[0];

    const deleteParams = {
      Bucket: bucketName,
      Key: key,
    };

    await s3Client.send(new DeleteObjectCommand(deleteParams));
  }
};

// export const openProject =
//   (userUUID: string, projectUUID: string) =>
//   (event: React.MouseEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     redirect(`/users/${userUUID}/projects/${projectUUID}`);
//   };

export const getIcon = async (iconLink: string) => {
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

export const deleteProject = async (projectUUID: string, userUUID: string) => {
  await client.connect();
  await db.collection('projects').deleteOne({ projectUUID });

  redirect(`/users/${userUUID}/projects`);
};

export const checkExistingUser = async (email: string) => {
  await client.connect();
  const user = await db.collection('users').findOne({
    email: email,
  });

  return user;
};

export const updateUser = async (email: string, data: any) => {
  await client.connect();
  await db.collection('users').updateOne(
    { email },
    {
      $set: data,
    }
  );
  redirect('/projects');
};

export const updateProject = async (
  formData: FormData
): Promise<(Project | string[])[]> => {
  await client.connect();
  return [{} as Project, [] as string[]];
  // db.collection('projects').updateOne(
  //   { projectUUID },
  //   {
  //     $set: project,
  //   }
  // );
  // return project;
};

export const getUser = async (userUUID: string) => {
  await client.connect();
  const user = await db.collection('users').findOne(
    {
      uuid: userUUID,
    },
    { projection: { _id: 0 } }
  );

  return user;
};

export const getTechs = async (queryText: string) => {
  await client.connect();
  try {
    const techs = await client
      .db('dev')
      .collection('icons')
      .find(
        { brandName: { $regex: queryText, $options: 'i' } },
        { projection: { _id: 0 } }
      )
      .toArray();
    return JSON.parse(JSON.stringify(techs));
  } catch (error) {
    console.error(error);
  }
};
