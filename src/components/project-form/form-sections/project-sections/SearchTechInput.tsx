import React from 'react';
import { Flex, TextField, Spinner, Badge, Tooltip } from '@radix-ui/themes';
import { MagnifyingGlassIcon, Cross2Icon } from '@radix-ui/react-icons';
import SearchResultList from './SearchResultList';
import { useEffect, useState } from 'react';
import { baseUrl, defultSearchTechValues } from '@/utils';
import { Brand } from '@/types/brand';
import TechCard from './TechCard';
type Props = {
  initialValue?: any[];
};

function SearchTechInput({ initialValue = [] }: Props) {
  const [query, setQuery] = useState('');
  const [queryBounce, setQueryBounce] = useState('');
  const [search, setSearch] = useState({
    loading: false,
    resultVisible: false,
    result: [] as Brand[],
  });
  const [techStack, setTechStack] = React.useState<Brand[]>(initialValue);

  const handleAddTechStack = (brandName: string, slug: string) => {
    setQueryBounce('');
    console.log(techStack);
    // add the tech if not existing already on a single line
    if (!techStack.find((t) => t.slug === slug) && techStack.length < 17) {
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
        <input type="hidden" name="content" value={JSON.stringify(techStack)} />

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
      {techStack.length > 0 && (
        <div className="flex flex-wrap gap-2 p-2 mt-2 rounded-md border border-gray-4 bg-[#000] justify-center">
          {techStack.map((tech) => (
            // <Tooltip content={tech.brand_name} key={tech.slug}>
            //   <Badge
            //     color="gray"
            //     variant="soft"
            //     highContrast
            //     className="flex flex-col items-center justify-center gap-2 w-[6rem] h-[6rem] p-3 relative text-center"
            //   >
            //     <img
            //       src={`https://cdn.simpleicons.org/${tech.slug}?viewbox=auto`}
            //       alt={tech.brand_name}
            //       className="h-8"
            //     />

            //     <p className="text-xs truncate w-full text-gray-11">
            //       {tech.brand_name}
            //     </p>
            //     <Cross2Icon
            //       className="cursor-pointer hover:bg-gray-6 absolute top-1 right-1"
            //       onClick={() =>
            //         setTechStack(techStack.filter((t) => t.slug !== tech.slug))
            //       }
            //     />
            //   </Badge>
            // </Tooltip>
            <TechCard
              tech={tech}
              key={tech.slug}
              onClick={() =>
                setTechStack(techStack.filter((t) => t.slug !== tech.slug))
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchTechInput;
