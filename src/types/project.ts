import { PROJECT_CONTENT_TYPE } from '@prisma/client';
import { Section } from './section';

export default interface Project {
  uuid: string;
  name: string;
  tagline?: string;
  iconLink?: string;
  sections: Section[];
  ownerId: string;
  slug: string;
  content: string;
  type: PROJECT_CONTENT_TYPE;
}

export interface ProjectFormData {
  name: string;
  tagline?: string;
  iconLink?: string;
  url: string;
}
