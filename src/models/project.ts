import mongoDB from 'mongodb';

export default interface Project {
  _id?: mongoDB.ObjectId;
  title?: string;
  tagline?: string;
  iconLink?: string | ArrayBuffer;
  sections?: Section[];
  userId?: number;
  url?: string;
}

export interface Section {
  title: string;
  contentType: string;
  content: string | string[] | object[];
}
