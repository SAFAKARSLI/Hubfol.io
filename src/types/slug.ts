export interface Params {
  userUUID: string;
  projectUUID: string;
  sectionUUID: string;
}

export interface SlugProps {
  params: Params;
  children: React.ReactNode;
}
