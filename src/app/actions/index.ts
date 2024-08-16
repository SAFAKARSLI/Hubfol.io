"use server"

import client from '@/db';
import { ObjectId } from 'mongodb';

export const getProjects = async () => {
  const db = await (await client).connect();
  // await client.connect()
  // const projects = await client.db('projects').collection('dev').find({userId: 123}, {projection: {title: 1, tagline: 1, iconLink: 1}}).toArray();
  const projects = await db.db('dev').collection('projects').find({userId: 123}).toArray();

  return JSON.parse(JSON.stringify(projects));
}

export const getProject = async (_id: string) => {
  const db = await (await client).connect();
  // await client.connect();
  const project = await db.db('dev').collection('projects').findOne({_id: new ObjectId(_id)});
  return JSON.parse(JSON.stringify(project));
}