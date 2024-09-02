import React, { useEffect, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import {
  Cross2Icon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@radix-ui/react-icons';
import { cloneDeep } from 'lodash';
import {
  RadioCards,
  Flex,
  Text,
  TextField,
  TextArea,
  Select,
  ScrollArea,
  Badge,
  Spinner,
  Button,
} from '@radix-ui/themes';

import Project from '@/types/project';
import SearchResultList from './SearchResultList';
import { SearchResult } from '@/types/searchResult';
import { getTechs } from '@/app/actions';
import { defaultSections, defaultSectionValues } from '@/utils';

type Props = {
  project: Project;
  setProject: (project: Project) => void;
};

function SectionsForm({ project, setProject }: Props) {
  const [activeSection, setActiveSection] = useState(0);
  const [query, setQuery] = useState('');
  const [queryBounce, setQueryBounce] = useState('');
  const [search, setSearch] = useState(defaultSectionValues);

  useEffect(() => {
    // Cleanup function that sets the state to default values.
    return () => {
      setSearch({ ...search, result: [], resultVisible: false });
      setQueryBounce('');
      setActiveSection(0);
      // setProject({ ...project, sections: defaultSections });
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
      setSearch(defaultSectionValues);
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

  const handleAddTechStack = (brandName: string, slug: string) => {
    const newSections = cloneDeep(project.sections!);
    (newSections[activeSection].content as SearchResult[]).push({
      brandName,
      slug,
    });
    setProject({ ...project, sections: newSections });
    setQueryBounce('');
  };

  const renderSections = () => {
    console.log(project);
    const sectionList = project.sections!.map((section, i) => {
      return (
        <RadioCards.Item
          value={i.toString()}
          key={i}
          className="flex flex-col items-start"
        >
          <Text as="div" size="2" weight="bold">
            {section.title}
          </Text>
          <div>
            <Text size={'1'} color="gray" mr={'1'}>
              Type:
            </Text>
            <Badge highContrast>{section.contentType}</Badge>
          </div>
        </RadioCards.Item>
      );
    });

    return (
      <Flex as="div" minHeight={'15rem'} justify={'between'}>
        <ScrollArea
          type="auto"
          scrollbars="vertical"
          className="rounded bg-gray-1  border-gray-5 w-[15rem] min-h-[20rem]"
          style={{ maxHeight: '25rem' }}
        >
          <RadioCards.Root
            defaultValue={'0'}
            value={activeSection.toString()}
            onValueChange={(e) => setActiveSection(parseInt(e))}
          >
            <Flex
              direction={'column'}
              gap={'3'}
              justify={'center'}
              height={'full'}
              p={'4'}
            >
              {sectionList}
            </Flex>
          </RadioCards.Root>
        </ScrollArea>

        <Flex direction={'column'} gap={'3'} width={'28rem'}>
          <Flex direction="column" height={'full'} gap="3" mb={'4'}>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Title
              </Text>
              <TextField.Root
                onChange={(e) => {
                  const newSections = cloneDeep(project.sections!);
                  newSections![activeSection].title = e.target.value;
                  setProject({ ...project, sections: newSections });
                }}
                placeholder="Enter the section header (e.g 'Project Description')"
                value={project.sections![activeSection].title}
              />
            </label>
            <div>
              <Text as="div" size="2" weight="bold">
                Content
                <Select.Root
                  defaultValue="text"
                  size={'1'}
                  onValueChange={(e) => {
                    const newSections = cloneDeep(project.sections!);
                    newSections[activeSection].contentType = e;
                    e == 'text'
                      ? (newSections[activeSection].content = '')
                      : (newSections[activeSection].content = []);
                    setProject({ ...project, sections: newSections });
                  }}
                  value={project.sections![activeSection].contentType}
                >
                  <Select.Trigger
                    className="max-w-[10rem] ml-2 mb-2"
                    variant="soft"
                  />
                  <Select.Content>
                    <Select.Group>
                      <Select.Item value="text">Plain-text</Select.Item>
                      <Select.Item value="tech-stack">Tech Stack</Select.Item>
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
              </Text>
              <label>
                {project.sections?.[activeSection]?.contentType ===
                'tech-stack' ? (
                  <Flex direction={'column'} width={'100%'}>
                    <TextField.Root
                      onFocus={() =>
                        setSearch({ ...search, resultVisible: true })
                      }
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
                ) : (
                  <TextArea
                    className="h-[10rem]"
                    value={project.sections![activeSection].content as string}
                    onChange={(e) => {
                      const newSections = cloneDeep(project.sections!);
                      newSections![activeSection].content = e.target.value;
                      setProject({ ...project, sections: newSections });
                    }}
                    placeholder="Enter the content here"
                  />
                )}
              </label>
            </div>
          </Flex>
        </Flex>
      </Flex>
    );
  };

  return (
    <div className="flex flex-col gap-4 my-5">
      <Text size="3">
        Sections are different ways by which you can flex your project. This
        information is visible when the project is active.
      </Text>

      {renderSections()}
      <Button
        variant="outline"
        className="h-[3rem] mx-0 my-2 font-bold"
        onClick={() => {
          const newSections = cloneDeep(project.sections!);
          newSections!.push({
            title: 'New Section',
            contentType: 'text',
            content: 'This is a new section',
          });
          setProject({ ...project, sections: newSections });
        }}
      >
        <PlusIcon /> Add Section
      </Button>
    </div>
  );
}

export default SectionsForm;
