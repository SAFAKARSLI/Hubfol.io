import { Tables } from "./supabase";

export default interface Project extends Tables<"Project"> {}

export interface ProjectFormData {
  name: string;
  tagline?: string;
  iconLink?: string;
  url: string;
}
