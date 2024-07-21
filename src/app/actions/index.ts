"use server"

import { client } from '@/db';
import { ObjectId } from 'mongodb';

export const fetchPartialProjects = async () => {
  await client.connect()
  const projects = await client.db('projects').collection('dev').find({userId: 123}, {projection: {title: 1, tagline: 1, iconLink: 1}}).toArray();
  projects && client.close();
  return projects;
}

export const fetchContent = async (_id: string) => {
    await client.connect();
    // Change this for dynamic userId
    const content = await client.db('projects').collection('dev').findOne({_id: new ObjectId(_id)}, {projection: {content: 1}});
    content && client.close();
    return content;
  }




