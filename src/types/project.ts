import { Section } from './section';

export default interface Project {
  uuid: string;
  name: string;
  tagline?: string;
  iconLink?: string;
  sections: Section[];
  ownerId: string;
  url: string;
}

export interface ProjectFormData {
  name: string;
  tagline?: string;
  iconLink?: string;
  url: string;
}
