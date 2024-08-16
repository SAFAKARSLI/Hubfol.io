'use client';
import React from 'react';
import {
  Box,
  Button,
  Heading,
  Dialog,
  Flex,
  Text,
  TextField,
  Separator,
  TextArea,
} from '@radix-ui/themes';
import { PlusIcon, Cross2Icon } from '@radix-ui/react-icons';
import { createProject } from '@/app/actions';

type Props = {};

function AddProjectButton({}: Props) {
  const [open, setOpen] = React.useState(true);
  const [sectionCount, setSectionCount] = React.useState(1);

  return (
    <Box className="mx-7">
      <Dialog.Root>
        <Dialog.Trigger>
          <Button
            variant="ghost"
            className="cursor-pointer rounded h-12 w-full"
          >
            <div className={`flex m-4 leading-none`}>
              <div className="flex gap-x-2">
                <PlusIcon /> Add Project
              </div>
            </div>
          </Button>
        </Dialog.Trigger>
        <Dialog.Content maxWidth="40rem">
          <Dialog.Title>New Project</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Enter the project information below. All of the fields are
            required*. You can edit this information later.
          </Dialog.Description>
          <Flex direction="column" gap="3" mb={'4'}>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Project Name
              </Text>
              <TextField.Root placeholder="Enter your project name" />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Tagline
              </Text>
              <TextField.Root placeholder="Describe your project in one sentence" />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                URL
              </Text>
              <TextField.Root placeholder="Enter the project URL" />
            </label>
          </Flex>

          <Separator size={'4'} mb={'4'} />

          <Flex direction="column" gap="3" mb={'4'}>
            <Heading size={'5'}>Sections</Heading>
            <Text size="2" mb="1">
              Sections are different ways you can flex your project. All
              available section types are listed below. It is recommended that
              you add a brief description of your project in the first section.
            </Text>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Header
              </Text>
              <TextField.Root placeholder="Enter the section header (e.g. 'Project Description')" />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Content
              </Text>
              <TextArea placeholder="Enter the content in text" />
            </label>
          </Flex>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button>Create Project</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </Box>
  );
}

export default AddProjectButton;
