export interface Params {
  userUUID: string;
  projectUUID: string;
  sectionUUID: string;
}

export interface SlugProps {
  params: Params;
  searchParams?: { step?: number };
  children: React.ReactNode;
}
