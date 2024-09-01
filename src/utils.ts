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

export const defaultSectionValues = {
  loading: false,
  result: [] as SearchResult[],
  resultVisible: false,
};
