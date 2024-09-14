import { Brand } from './brand';

export interface Section {
  uuid: string;
  createdDate: Date;
  lastModifiedDate: Date | null;
  title: string;
  contentType: string;
  content: string | Brand[];
  projectId: string;
  // tags: string[];
}

export interface SectionFormData {
  title: string;
  contentType: string;
  content: string;
  // tags: string[];
}
