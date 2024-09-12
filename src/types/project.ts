import mongoDB from 'mongodb';
import { SearchResult } from './searchResult';

export default interface Project {
  _id?: mongoDB.ObjectId;
  projectUUID?: string;
  title?: string;
  tagline?: string;
  iconLink?: string;
  sections?: Section[];
  ownerId?: string;
  url?: string;
  [Symbol.iterator]?(): IterableIterator<any>;
}

export interface Section {
  header: string;
  contentType: string;
  content: string | SearchResult[];
  [Symbol.iterator]?(): IterableIterator<any>;
}
