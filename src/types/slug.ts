export interface Params {
  userUUID: string;
  projectUUID: string;
  sectionUUID: string;
}

export interface SlugProps {
  params: Params;
  searchParams?: { step?: number; error: string };
  children: React.ReactNode;
}
