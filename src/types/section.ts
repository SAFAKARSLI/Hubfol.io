import { Content } from '@prisma/client';
import { Brand } from './brand';
import { InputJsonValue } from '@prisma/client/runtime/library';

export interface Section {
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string | null;
  isActive: boolean | null;
  contentType: Content;
  content: InputJsonValue;
  projectId: string;
  // tags: string[];
}

// Carousel Section content
export type Image = {
  name: string;
  url?: string;
  blob?: Blob;
};

export interface SectionFormData {
  title: string;
  contentType: string;
  content: string;
  // tags: string[];
}
