import React from 'react';
import { Flex, TextField, Spinner, Badge } from '@radix-ui/themes';
import { MagnifyingGlassIcon, Cross2Icon } from '@radix-ui/react-icons';
import SearchResultList from './SearchResultList';
import { useEffect, useState } from 'react';
import { baseUrl, defultSearchTechValues } from '@/utils';
import { Brand } from '@/types/brand';
type Props = {
  onTechAdd: (key: string, value: string | Blob) => void;
};

function SearchTechInput({}: Props) {
  const [query, setQuery] = useState('');
  const [queryBounce, setQueryBounce] = useState('');
  const [search, setSearch] = useState({
    loading: false,
    resultVisible: false,
    result: [] as Brand[],
  });
  const [techStack, setTechStack] = useState<Brand[]>([]);

  const handleAddTechStack = (brandName: string, slug: string) => {
    setQueryBounce('');
    // add the tech if not existing already on a single line
    if (!techStack.find((t) => t.slug === slug)) {
      setTechStack([...techStack, { brand_name: brandName, slug }]);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (queryBounce) {
        setQuery(queryBounce);
        setSearch({ ...search, loading: false });
      }
    }, 700);

    if (queryBounce === '') {
      setQuery('');
      setSearch({ ...search, resultVisible: false, result: [] });
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
        let res = (await fetch(`${baseUrl}/api/brands?query=${query}`).then(
          (res) => res.json()
        )) as Brand[];
        console.log('res:', res);
        setSearch({ ...search, result: res, resultVisible: true });
      } catch (error) {
        console.error('Error fetching techs:', error);
      }
    };

    if (query) {
      fetchTech();
    }
  }, [query]);

  return (
    <div>
      <div className="flex flex-col w-full relative flex-none ">
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
          className="-md:text-xs"
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
      </div>
      <div className="flex flex-wrap gap-2 py-2">
        {techStack.map((tech) => (
          <Badge color="gray" variant="soft" highContrast className="h-8">
            <img
              src={`https://cdn.simpleicons.org/${tech.slug}?viewbox=auto`}
              alt={tech.brand_name}
              className="h-4"
            />
            <p className="text-xs">{tech.brand_name}</p>
            <Cross2Icon
              className="cursor-pointer hover:bg-gray-6"
              onClick={() =>
                setTechStack(techStack.filter((t) => t.slug !== tech.slug))
              }
            />
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default SearchTechInput;
