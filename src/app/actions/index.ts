"use server"

import { client } from '@/db';
import { ObjectId } from 'mongodb';

export const fetchPartialProjects = async () => {
  await client.connect()
  const projects = await client.db('projects').collection('dev').find({userId: 123}, {projection: {title: 1, tagline: 1, iconLink: 1}}).toArray();
  projects && client.close();
  return projects;
}

export const fetchPartial = async (_id: string, query: string[]) => {
    await client.connect();
    const queryObject: Record<string, number> = {};

    query.forEach((element) => {
      queryObject[element] = 1;
    });

    const content = await client.db('projects').collection('dev').findOne({_id: new ObjectId(_id)}, {projection: queryObject});
    content && client.close();
    return content;
  }




