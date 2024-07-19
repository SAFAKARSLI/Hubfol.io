"use server"

import {client} from '../db';

export const fetchProjects = async () => {
    await client.connect();
    // Change this for dynamic userId
    const projects = await client.db('projects').collection('dev').find({userId: 123}).toArray();
    return projects;
  }