import { SearchResult } from './types/searchResult';

export const defaultSections = [
  {
    title: 'Project Description',
    contentType: 'text',
    content: 'This is a project description',
  },

  {
    title: 'Tech Stack',
    contentType: 'tech-stack',
    content: [],
  },
];

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

export const allowedIconTypes =
  'image/png, image/jpeg, image/jpg, image/svg+xml';

export const links: string[] = [
  'Profile Overview',
  'Projects',
  'Publishings',
  'Reviews',
];
