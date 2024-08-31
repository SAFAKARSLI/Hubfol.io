export interface Params {
  userUUID: string;
  projectUUID: string;
}

export interface SlugProps {
  params: Params;
  children: React.ReactNode;
}
