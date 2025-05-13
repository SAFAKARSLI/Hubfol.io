import { Tables } from "./supabase";

export default interface Section extends Tables<"Section"> {}

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
