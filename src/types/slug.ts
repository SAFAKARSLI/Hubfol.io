export interface Params {
  userUUID: string;
  projectUUID: string;
  sectionUUID: string;
}

export interface SlugProps {
  params: Params;
  searchParams?: {
    step?: number;
    error: string;
    initial: string;
    initialize: string;
  };
  children: React.ReactNode;
}
