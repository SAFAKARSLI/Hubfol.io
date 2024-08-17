'use server';

import client from '@/db';
import Project from '@/models/project';
import { ObjectId } from 'mongodb';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  // paginateListObjectsV2,
  GetObjectCommand,
} from '@aws-sdk/client-s3';

export const getProjects = async () => {
  await client.connect();
  // const projects = await client.db('projects').collection('dev').find({userId: 123}, {projection: {title: 1, tagline: 1, iconLink: 1}}).toArray();
  const projects = await client
    .db('dev')
    .collection('projects')
    .find({ userId: 123 })
    .toArray();

  return JSON.parse(JSON.stringify(projects));
};

export const getProject = async (_id: string) => {
  await client.connect();
  const project = await client
    .db('dev')
    .collection('projects')
    .findOne({ _id: new ObjectId(_id) });
  return JSON.parse(JSON.stringify(project));
};

export const createProject = async (project: Project) => {
  await client.connect();

  // project.
  const result = await client
    .db('dev')
    .collection('projects')
    .insertOne(project);
  return result;
};
