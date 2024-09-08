import React, { act, useEffect, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import {
  ArrowDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Cross2Icon,
  MagnifyingGlassIcon,
  PlusIcon,
  TrashIcon,
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
  IconButton,
  Separator,
  Heading,
} from '@radix-ui/themes';

import Project from '@/types/project';
import SearchResultList from './SearchResultList';
import { SearchResult } from '@/types/searchResult';
import { getTechs } from '@/app/actions';
import { defultSearchTechValues, preferredColorOptions } from '@/utils';
import SearchTechInput from './SearchTechInput';
import Divider from './subsections/Divider';
import TechCardList from './TechCardList';
import FormInput from './FormInput';

type Props = {
  project: Project;
  setProject: (project: Project) => void;
};

function SectionsForm({ project, setProject }: Props) {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    // Cleanup function that sets the state to default values.
    return () => {
      setActiveSection(0);
    };
  }, []);

  const handleDeleteSection = (index: number) => {
    const newSections = cloneDeep(project.sections!);
    newSections.splice(index, 1);

    if (activeSection !== 0) setActiveSection(activeSection - 1);
    setProject({ ...project, sections: newSections });
  };

  const renderSections = () => {
    const sectionList = project.sections!.map((section, i) => {
      return (
        <RadioCards.Item
          value={i.toString()}
          key={i}
          className="flex md:flex-col items-start z-10 justify-between"
        >
          <Text
            as="div"
            size="2"
            weight="bold"
            truncate
            className="-md:text-xs"
          >
            {section.title}
          </Text>

          <div className="flex">
            <Text size={'1'} color="gray" mr={'1'}>
              Type:
            </Text>
            <Badge highContrast>{section.contentType}</Badge>
          </div>
        </RadioCards.Item>
      );
    });

    return (
      <div className="flex -md:flex-col gap-3 py-4 -md:items-center">
        <div className="flex gap-1 flex-col  items-center h-full max-w-[20rem]">
          <Heading size={'3'} className="-md:text-sm">
            Sections List
          </Heading>
          <ScrollArea
            type="auto"
            scrollbars="vertical"
            className="rounded bg-gray-1  border-gray-5 md:w-[15rem] h-[20rem] "
          >
            <RadioCards.Root
              defaultValue={'0'}
              value={activeSection.toString()}
              onValueChange={(e) => {
                setActiveSection(parseInt(e));
              }}
            >
              <Flex direction={'column'} gap={'3'} height={'full'} p={'4'}>
                {sectionList}
              </Flex>
            </RadioCards.Root>
          </ScrollArea>
        </div>
        <Separator orientation={'vertical'} size={'4'} />
        <div className="flex flex-col gap-3 flex-1 min-w-[10rem] w-full">
          <FormInput
            label="Title"
            name="title"
            placerholder="Enter the section title (e.g 'Project Description')"
            type="text"
            onChange={(e) => {
              const newSections = cloneDeep(project.sections!);
              newSections![activeSection].title = e.target.value;
              setProject({ ...project, sections: newSections });
            }}
            value={project.sections![activeSection].title}
          />

          <div className="flex flex-col flex-1">
            <Text weight="bold" className="-md:text-sm">
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
                    <Select.Item value="text">Text</Select.Item>
                    <Select.Item value="tech-stack">Tech Stack</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </Text>

            {project.sections?.[activeSection]?.contentType === 'tech-stack' ? (
              <SearchTechInput
                project={project}
                sectionNo={activeSection}
                setProject={setProject}
              />
            ) : (
              <TextArea
                className="flex-1 -md:text-xs"
                value={project.sections![activeSection].content as string}
                onChange={(e) => {
                  const newSections = cloneDeep(project.sections!);
                  newSections![activeSection].content = e.target.value;
                  setProject({ ...project, sections: newSections });
                }}
                placeholder="Enter the content here"
              />
            )}
          </div>
          {project.sections?.[activeSection]?.contentType === 'tech-stack' && (
            <ScrollArea
              type="auto"
              scrollbars="vertical"
              className="rounded  p-3 bg-gray-1 w-full h-full min-h-[10rem] "
            >
              <TechCardList
                setTechs={(e: number) => {
                  const newSections = cloneDeep(project.sections!);
                  newSections[activeSection].content = (
                    newSections[activeSection].content as SearchResult[]
                  ).filter((_, i) => i !== e);
                  setProject({ ...project, sections: newSections });
                }}
                techs={
                  project.sections![activeSection].content as SearchResult[]
                }
              />
            </ScrollArea>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 my-5 w-full">
      <Text size="3" className="-md:text-sm">
        Sections are different ways by which you can flex your project. This
        information is visible when the project is active.
      </Text>

      {renderSections()}
      <div className="flex h-[3rem] w-full gap-6">
        <Button
          variant="soft"
          className="h-full flex-1 font-bold -sm:text-xs"
          onClick={() => {
            const newSections = cloneDeep(project.sections!);
            newSections!.push({
              title: 'New Section',
              contentType: 'text',
              content: 'This is a new section',
            });
            setProject({ ...project, sections: newSections });
            setActiveSection(newSections.length - 1);
          }}
        >
          <PlusIcon /> Add Section
        </Button>
        <Button
          className="h-full flex-initial font-bold"
          variant="outline"
          color="red"
          onClick={() => {
            handleDeleteSection(activeSection);
          }}
        >
          <TrashIcon /> Delete Section
        </Button>
      </div>
    </div>
  );
}

export default SectionsForm;
