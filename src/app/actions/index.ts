'use server';

import client from '@/db';
import Project from '@/types/project';
import { signIn, signOut } from 'next-auth/react';
import { ObjectId } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import {
  S3Client,
  PutObjectCommand,
  ObjectCannedACL,
  DeleteObjectCommand,
  // paginateListObjectsV2,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { redirect } from 'next/navigation';

const region = process.env.AWS_REGION as string;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID as string;
const secretAccessKey = process.env.AWS_SECRET_KEY as string;
const bucketName = process.env.AWS_PROJECT_ICONS_BUCKET_NAME as string;

export const logIn = async (userUUID: string) => {
  await signIn('google', { callbackUrl: `/users/${userUUID}/projects` });
};

export const logOut = async (userUUID: string) => {
  await signOut({ callbackUrl: `/users/${userUUID}/projects` });
};

export const getProjects = async (userUUID: string) => {
  await client.connect();
  const projects = await client
    .db('dev')
    .collection('projects')
    .find({ ownerId: userUUID })
    .toArray();

  return JSON.parse(JSON.stringify(projects));
};

export const getProject = async (projectUUID: string) => {
  await client.connect();
  const project = await client
    .db('dev')
    .collection('projects')
    .findOne({ projectUUID });
  return JSON.parse(JSON.stringify(project));
};

export const getProjectCount = async () => {
  await client.connect();
  const count = await client.db('dev').collection('projects').countDocuments();
  return count;
};

export const createProject = async (
  project: Project,
  formData: FormData,
  userUUID: string
) => {
  await client.connect();

  const iconLink = formData.get('iconLink');

  if (iconLink && iconLink instanceof File) {
    const arrayBuffer = await iconLink.arrayBuffer();
    const body = Buffer.from(arrayBuffer);

    if (!region || !accessKeyId || !secretAccessKey || !bucketName) {
      throw new Error('Missing AWS configuration');
    }

    const s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const uniqueKey = `${project.title?.replaceAll(
      ' ',
      '_'
    )}-${new Date().getTime()}`; // Use a unique key for each project

    const uploadParams = {
      Bucket: bucketName,
      Key: uniqueKey,
      Body: body,
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    project.iconLink = `https://s3.amazonaws.com/${bucketName}/${uniqueKey}`;
    project.ownerId = userUUID; // UPDATE THIS
    project.projectUUID = uuidv4();

    await client.db('dev').collection('projects').insertOne(project);
    redirect(`/users/${userUUID}/projects`);
  } else {
    throw new Error('Invalid iconLink');
  }
};

export const deleteProject = async (_id: string) => {
  await client.connect();
  await client
    .db('dev')
    .collection('projects')
    .deleteOne({ _id: new ObjectId(_id) });

  redirect('/projects');
};

export const checkExistingUser = async (email: string) => {
  await client.connect();
  const user = await client.db('dev').collection('users').findOne({
    email: email,
  });

  return user;
};

export const updateUser = async (email: string, data: any) => {
  await client.connect();
  await client.db('dev').collection('users').updateOne(
    { email },
    {
      $set: data,
    }
  );

  redirect('/projects');
};
export const getUser = async (userUUID: string) => {
  await client.connect();
  const user = await client.db('dev').collection('users').findOne({
    uuid: userUUID,
  });

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
        { projection: { _id: 0 } } // Exclude the _id field
      )
      .toArray();
    return JSON.parse(JSON.stringify(techs));
  } catch (error) {
    console.error(error);
  }
};
