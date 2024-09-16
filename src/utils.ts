import { Brand } from './types/brand';
import { Section } from './types/section';

export const defaultSections = [
  {
    uuid: '123e4567-e89b-12d3-a456-426614174000',
    title: 'Project Description',
    contentType: 'TEXT',
    content: 'This is a project description',
    createdDate: new Date(),
    lastModifiedDate: null,
    projectId: 'project-uuid-1',
  },

  {
    uuid: '123e4567-e89b-12d3-a456-426614174001',
    title: 'Tech Stack',
    contentType: 'TECH_STACK',
    content: [] as Brand[],
    createdDate: new Date(),
    lastModifiedDate: null,
    projectId: 'project-uuid-1',
  },
] as Section[];

export const extractUserUUID = (url: string) => {
  const regex = /\/u\/([^\/]+)\/projects\//;
  const match = url.match(regex);

  if (match && match[1]) {
    return match[1]; // This is the userUUID
  } else {
    return null; // Return null if not found
  }
};

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const preferredColorOptions: {
  accentColor: colorOptions;
  appearance: appearanceOptions;
} = {
  accentColor: 'violet',
  appearance: 'dark',
};

export const defultSearchTechValues = {
  loading: false,
  result: [] as Brand[],
  resultVisible: false,
};

export const defaultIconLink =
  'https://s3.amazonaws.com/hubfol.io.project-icons/globe-solid.svg';

export type colorOptions =
  | 'gray'
  | 'gold'
  | 'bronze'
  | 'brown'
  | 'yellow'
  | 'amber'
  | 'orange'
  | 'tomato'
  | 'red'
  | 'ruby'
  | 'crimson'
  | 'pink'
  | 'plum'
  | 'purple'
  | 'violet'
  | 'iris'
  | 'indigo'
  | 'blue'
  | 'cyan'
  | 'teal'
  | 'jade'
  | 'green'
  | 'grass'
  | 'lime'
  | 'mint'
  | 'sky';

export type grayColorOptions =
  | 'gray'
  | 'mauve'
  | 'slate'
  | 'sage'
  | 'sand'
  | 'auto'
  | 'olive'
  | undefined;

export type appearanceOptions = 'dark' | 'inherit' | 'light' | undefined;

export type buttonVariants =
  | 'soft'
  | 'classic'
  | 'solid'
  | 'surface'
  | 'outline'
  | 'ghost'
  | undefined;

export type InputType =
  | 'number'
  | 'search'
  | 'time'
  | 'text'
  | 'hidden'
  | 'tel'
  | 'url'
  | 'email'
  | 'date'
  | 'datetime-local'
  | 'month'
  | 'password'
  | 'week'
  | undefined;

export const allowedIconTypes =
  'image/png, image/jpeg, image/jpg, image/svg+xml';

export const links = [
  {
    title: 'Profile Overview',
    url: 'profile-overview',
  },
  {
    title: 'Projects',
    url: 'projects',
  },
  {
    title: 'Publishings',
    url: 'publishings',
  },
  {
    title: 'Reviews',
    url: 'reviews',
  },
];
