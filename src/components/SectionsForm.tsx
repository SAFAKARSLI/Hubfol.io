import React, { useEffect, useState } from 'react';
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
} from '@radix-ui/themes';

import Project from '@/types/project';
import SearchResultList from './SearchResultList';
import { SearchResult } from '@/types/searchResult';
import { getTechs } from '@/app/actions';
import { defultSearchTechValues } from '@/utils';
import SearchTechInput from './SearchTechInput';

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
    setProject({ ...project, sections: newSections });
    setActiveSection(0);
  };

  const renderSections = () => {
    console.log(project);
    const sectionList = project.sections!.map((section, i) => {
      return (
        <RadioCards.Item
          value={i.toString()}
          key={i}
          className="flex flex-col items-start z-10"
        >
          <div className="flex justify-between w-full">
            <Text as="div" size="2" weight="bold">
              {section.title}
            </Text>
          </div>

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
      <div className="flex  gap-[4rem] h-[20rem]">
        <ScrollArea
          type="auto"
          scrollbars="vertical"
          className="rounded bg-gray-1  border-gray-5 w-[15rem] h-full"
        >
          <RadioCards.Root
            defaultValue={'0'}
            value={activeSection.toString()}
            onValueChange={(e) => setActiveSection(parseInt(e))}
          >
            <Flex direction={'column'} gap={'3'} height={'full'} p={'4'}>
              {sectionList}
            </Flex>
          </RadioCards.Root>
        </ScrollArea>

        <div className="flex flex-col h-full gap-3 flex-1">
          <div className="flex-none">
            <Text mb="1" weight="bold">
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
          </div>
          <div className="flex-1 flex-col flex">
            <Text weight="bold">
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
            <label className="flex-1">
              {project.sections?.[activeSection]?.contentType ===
              'tech-stack' ? (
                <SearchTechInput
                  project={project}
                  sectionNo={activeSection}
                  setProject={setProject}
                />
              ) : (
                <TextArea
                  className="h-full"
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
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 my-5 w-full">
      <Text size="3">
        Sections are different ways by which you can flex your project. This
        information is visible when the project is active.
      </Text>

      {renderSections()}
      <div className="flex h-[3rem] w-full gap-6">
        <Button
          variant="soft"
          className="h-full flex-1 font-bold"
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
        <Button
          className="h-full flex-none font-bold"
          variant="outline"
          color="red"
          onClick={() => {
            handleDeleteSection(activeSection);
          }}
        >
          {' '}
          <TrashIcon /> Delete Section
        </Button>
      </div>
    </div>
  );
}

export default SectionsForm;
