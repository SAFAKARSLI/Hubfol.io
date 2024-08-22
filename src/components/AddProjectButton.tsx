'use client';
import React, { useEffect } from 'react';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import { cloneDeep } from 'lodash';
import {
  Box,
  Button,
  Heading,
  RadioCards,
  Dialog,
  Flex,
  Text,
  TextField,
  Separator,
  TextArea,
  Select,
  Tabs,
  ScrollArea,
  Badge,
} from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';

import { createProject } from '@/app/actions';
import Project from '@/models/project';

type Props = {};

const defaultSections = [
  {
    title: 'Project Description',
    contentType: 'text',
    content: 'This is a project description',
  },

  {
    title: 'Tech Stack',
    contentType: 'tech-stack',
    content: 'This is a tech stack',
  },
];

function AddProjectButton({}: Props) {
  const [newProject, setNewProject] = React.useState({
    sections: cloneDeep(defaultSections),
  } as Project);
  const [activeSection, setActiveSection] = React.useState(0);

  const handleFileInput = (file: File) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const arrayBuffer = reader.result;
      setNewProject({ ...newProject, iconLink: arrayBuffer! });
    };
  };

  useEffect(() => {
    console.log(newProject);
  });

  const renderSections = () => {
    const sectionList = newProject.sections!.map((section, i) => {
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
                  const newSections = cloneDeep(newProject.sections!);
                  newSections![activeSection].title = e.target.value;
                  setNewProject({ ...newProject, sections: newSections });
                }}
                placeholder="Enter the section header (e.g 'Project Description')"
                value={newProject.sections![activeSection].title}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Content
                <Select.Root
                  defaultValue="text"
                  size={'1'}
                  onValueChange={(e) => {
                    const newSections = cloneDeep(newProject.sections!);
                    newSections[activeSection].contentType = e;
                    setNewProject({ ...newProject, sections: newSections });
                  }}
                  value={newProject.sections![activeSection].contentType}
                >
                  <Select.Trigger
                    className="max-w-[10rem] ml-2"
                    variant="soft"
                  />
                  <Select.Content>
                    <Select.Group>
                      <Select.Item value="text">Plain-text</Select.Item>
                      <Select.Item value="tech-stack">Tech Stack</Select.Item>
                      <Select.Item value="carousel">Carousel</Select.Item>
                      <Select.Item value="video">Video</Select.Item>
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
              </Text>
              <TextArea
                value={newProject.sections![activeSection].content as string}
                onChange={(e) => {
                  const newSections = cloneDeep(newProject.sections!);
                  newSections![activeSection].content = e.target.value;
                  setNewProject({ ...newProject, sections: newSections });
                }}
                placeholder="Enter the content"
              />
            </label>
          </Flex>
        </Flex>
      </Flex>
    );
  };

  const handleCreateProject = () => {
    const formData = new FormData();

    if (newProject.iconLink instanceof ArrayBuffer) {
      const blob = new Blob([newProject.iconLink], {
        type: 'application/octet-stream',
      });
      formData.append('iconLink', blob);
    }

    createProject(JSON.parse(JSON.stringify(newProject)), formData);
  };

  return (
    <Box className="mx-7">
      <Dialog.Root
        onOpenChange={() => {
          setNewProject({ sections: defaultSections });
          setActiveSection(0);
        }}
      >
        <Dialog.Trigger>
          <Button
            variant="ghost"
            className="cursor-pointer rounded h-12 w-full my-0 "
          >
            <PlusIcon /> Add Project
          </Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="50rem">
          <Dialog.Title>New Project</Dialog.Title>

          <Tabs.Root defaultValue="project-info">
            <Tabs.List>
              <Tabs.Trigger value="project-info">Project Info</Tabs.Trigger>
              <Tabs.Trigger value="sections">Sections</Tabs.Trigger>
              {/* <Tabs.Trigger value="frame">Frame</Tabs.Trigger> */}
            </Tabs.List>

            <Tabs.Content value="project-info">
              <Flex my={'4'} gap={'3'} direction={'column'}>
                <Text size="2">
                  Enter the project information below. All of the fields are
                  required*. You can edit this information later.
                </Text>
                <Flex direction="column" gap="3" mb={'4'}>
                  <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                      Project Name
                    </Text>
                    <TextField.Root
                      onChange={(e) => {
                        setNewProject({ ...newProject, title: e.target.value });
                      }}
                      placeholder="Enter your project name"
                    />
                  </label>
                  <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                      Tagline
                    </Text>
                    <TextField.Root
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          tagline: e.target.value,
                        })
                      }
                      placeholder="Describe your project in one sentence"
                    />
                  </label>
                  <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                      URL
                    </Text>
                    <TextField.Root
                      onChange={(e) =>
                        setNewProject({ ...newProject, url: e.target.value })
                      }
                      placeholder="Enter the project URL"
                    />
                  </label>
                  <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                      Icon Image
                    </Text>
                    <input
                      onChange={(e) =>
                        handleFileInput((e.target.files as FileList)[0])
                      }
                      type="file"
                    />
                  </label>
                </Flex>
              </Flex>
            </Tabs.Content>

            <Tabs.Content value="sections">
              <Flex direction="column" gap="3" my={'4'}>
                <Text size="2" mb="1">
                  Sections are different ways you can flex your project. This
                  information is visible when the project is active.
                </Text>

                {renderSections()}
                <Button
                  variant="outline"
                  className="h-[3rem] mx-0 my-2 font-bold"
                  onClick={() => {
                    const newSections = cloneDeep(newProject.sections!);
                    newSections!.push({
                      title: 'New Section',
                      contentType: 'text',
                      content: 'This is a new section',
                    });
                    setNewProject({ ...newProject, sections: newSections });
                  }}
                >
                  <PlusIcon /> Add Section
                </Button>
              </Flex>
            </Tabs.Content>

            {/* <Tabs.Content value="frame">
              <Text size="2">
                Edit your profile or update contact information.
              </Text>
            </Tabs.Content> */}
          </Tabs.Root>

          <Separator size={'4'} mb={'4'} />

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={handleCreateProject}>Create Project</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </Box>
  );
}

export default AddProjectButton;
