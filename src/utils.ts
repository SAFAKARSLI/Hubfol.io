import { Section } from './types/project';
import { SearchResult } from './types/searchResult';

export const defaultSections = [
  {
    header: 'Project Description',
    contentType: 'text',
    content: 'This is a project description',
  },

  {
    header: 'Tech Stack',
    contentType: 'tech-stack',
    content: [],
  },
] as Section[];

export const preferredColorOptions: {
  accentColor: colorOptions;
  appearance: appearanceOptions;
} = {
  accentColor: 'violet',
  appearance: 'dark',
};

export const defultSearchTechValues = {
  loading: false,
  result: [] as SearchResult[],
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
