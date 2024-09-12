'use client';
import React from 'react';
import {
  Dialog,
  Tabs,
  Separator,
  Flex,
  Button,
  IconButton,
} from '@radix-ui/themes';

import Project from '@/types/project';
import { Cross1Icon } from '@radix-ui/react-icons';
import * as Form from '@radix-ui/react-form';
import { useRouter } from 'next/navigation';
import ProjectInfoForm from '../project-form/form-sections/project-info/ProjectInfoForm';
import SectionsForm from '../project-form/form-sections/project-sections/SectionsTable';
import FormErrorMessage from '../project-form/FormErrorMessage';

type Props = {
  title: string;
  actionButtonLabel: string;
  initialValues: Project;
  formAction: (formData: FormData) => Promise<(Project | string[])[]>;
};

function ProjectDialog({
  title,
  actionButtonLabel,
  initialValues,
  formAction,
}: Props) {
  return (
    <Dialog.Content
      maxWidth="50rem"
      onEscapeKeyDown={(e) => e.preventDefault()}
      onInteractOutside={(e) => e.preventDefault()}
    >
      <div className="flex justify-between">
        <Dialog.Title size={'6'}>{title}</Dialog.Title>

        <Dialog.Close>
          <IconButton className="cursor-pointer" variant="ghost" size={'2'}>
            <Cross1Icon className="w-5 h-5" />
          </IconButton>
        </Dialog.Close>
      </div>

      {/* <FormErrorMessage /> */}

      <Form.Root className="flex flex-col">
        <Tabs.Root defaultValue="project-info">
          <Tabs.List size={'2'}>
            <Tabs.Trigger value="project-info">Project Info</Tabs.Trigger>
            <Tabs.Trigger value="sections">Sections</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="project-info">
            <ProjectInfoForm initialValues={initialValues} />
          </Tabs.Content>

          <Tabs.Content value="sections">
            <SectionsForm initialValues={initialValues} />
          </Tabs.Content>
        </Tabs.Root>

        <Separator size={'4'} mb={'4'} color={'gray'} />

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" size={'3'} color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Form.Submit asChild>
            <Button size={'3'} asChild>
              <button type="submit">{actionButtonLabel}</button>
            </Button>
          </Form.Submit>
        </Flex>
      </Form.Root>
    </Dialog.Content>
  );
}

export default ProjectDialog;
