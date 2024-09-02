import React from 'react';
import { Flex, TextField, Spinner } from '@radix-ui/themes';
import { MagnifyingGlassIcon, Cross2Icon } from '@radix-ui/react-icons';
import { SearchResult } from '@/types/searchResult';
import SearchResultList from './SearchResultList';
import { cloneDeep } from 'lodash';
import { useEffect, useState } from 'react';
import { getTechs } from '@/app/actions';
import { defultSearchTechValues } from '@/utils';
import Project from '@/types/project';

type Props = {
  project: Project;
  setProject: (project: Project) => void;
  sectionNo: number;
};

function SearchTechInput({ project, setProject, sectionNo }: Props) {
  const [query, setQuery] = useState('');
  const [queryBounce, setQueryBounce] = useState('');
  const [search, setSearch] = useState(defultSearchTechValues);

  const handleAddTechStack = (brandName: string, slug: string) => {
    const newSections = cloneDeep(project.sections!);
    (newSections[sectionNo].content as SearchResult[]).push({
      brandName,
      slug,
    });
    setProject({ ...project, sections: newSections });
    setQueryBounce('');
  };

  useEffect(() => {
    // Cleanup function that sets the state to default values.
    return () => {
      setSearch({ ...search, result: [], resultVisible: false });
      setQueryBounce('');
      // setActiveSection(0);
    };
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (queryBounce) {
        setQuery(queryBounce);
        setSearch({ ...search, loading: false });
      }
    }, 700);

    if (queryBounce === '') {
      setQuery('');
      setSearch(defultSearchTechValues);
    }

    return () => {
      clearTimeout(timeoutId);
      setSearch({ ...search, loading: true, resultVisible: false });
    };
  }, [queryBounce]);

  // Is called after the bounce
  useEffect(() => {
    const fetchTech = async () => {
      try {
        let result = (await getTechs(query)) as SearchResult[];
        setSearch({ ...search, result, resultVisible: true });
      } catch (error) {
        console.error('Error fetching techs:', error);
      }
    };

    if (query) {
      fetchTech();
    }
  }, [query]);

  return (
    <Flex direction={'column'} width={'100%'}>
      <TextField.Root
        onFocus={() => setSearch({ ...search, resultVisible: true })}
        onBlur={(e) => {
          setSearch({ ...search, resultVisible: false });
        }}
        size={'2'}
        value={queryBounce}
        onChange={(e) => {
          setQueryBounce(e.target.value);
        }}
        placeholder="Search for a technology"
      >
        <TextField.Slot>
          {search.loading ? (
            <Spinner />
          ) : (
            <MagnifyingGlassIcon height="16" width="16" />
          )}
        </TextField.Slot>
        {queryBounce && (
          <TextField.Slot>
            <Cross2Icon
              className="cursor-pointer hover:bg-gray-3"
              onClick={() => setQueryBounce('')}
            />
          </TextField.Slot>
        )}
      </TextField.Root>
      {search.resultVisible && (
        <SearchResultList
          onTechAdd={handleAddTechStack}
          iconList={search.result}
        />
      )}
    </Flex>
  );
}

export default SearchTechInput;
