"use server"

import {client} from '@/db';
import { ObjectId } from 'mongodb';

export const fetchProjects = async () => {
    await client.connect();
    // Change this for dynamic userId
    const projects = await client.db('projects').collection('dev').find({userId: 123}).toArray();
    return projects;
  }

export const fetchProjectWithId = async (_id: string) => {
  await client.connect();
  const project = await client.db('projects').collection('dev').findOne({_id: new ObjectId(_id)});
  project != null;
  return project;
}


export const fetchPartialProjects = async () => {
  await client.connect()
  const projects = await client.db('projects').collection('dev').find({userId: 123}, {projection: {title: 1, tagline: 1, iconLink: 1}}).toArray();
  return projects;
}