import mongoDB from 'mongodb';
import { SearchResult } from './searchResult';

export default interface Project {
  _id?: mongoDB.ObjectId;
  projectUUID?: string;
  title?: string;
  tagline?: string;
  iconLink?: string | ArrayBuffer;
  sections?: Section[];
  ownerId?: string;
  url?: string;
  [Symbol.iterator]?(): IterableIterator<any>;
}

export interface Section {
  title: string;
  contentType: string;
  content: string | SearchResult[];
  [Symbol.iterator]?(): IterableIterator<any>;
}
