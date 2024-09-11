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
import ProjectInfoForm from './ProjectInfoForm';
import SectionsForm from './SectionsForm';
import Project from '@/types/project';
import { Cross1Icon } from '@radix-ui/react-icons';
import * as Form from '@radix-ui/react-form';
import { useRouter } from 'next/navigation';

type Props = {
  title: string;
  actionButtonLabel: string;
  onSubmit: () => void;
  project: Project;
  setProject: (project: Project) => void;
  setDialog: (open: boolean) => void;
  initialProject: Project;
};

function ProjectDialog({
  title,
  actionButtonLabel,
  onSubmit,
  project,
  setProject,
  setDialog,
  initialProject,
}: Props) {
  const router = useRouter();
  const handleCancelChange = () => {
    setProject(initialProject);
    setDialog(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
    setDialog(false);
    router.refresh();
  };

  return (
    <Dialog.Content
      maxWidth="50rem"
      onEscapeKeyDown={(e) => e.preventDefault()}
      onInteractOutside={(e) => e.preventDefault()}
    >
      <Form.Root className="flex flex-col" onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <Dialog.Title size={'6'}>{title}</Dialog.Title>
          <Dialog.Close>
            <IconButton
              className="cursor-pointer"
              variant="ghost"
              size={'2'}
              onClick={handleCancelChange}
            >
              <Cross1Icon className="w-5 h-5" />
            </IconButton>
          </Dialog.Close>
        </div>

        <Tabs.Root defaultValue="project-info">
          <Tabs.List size={'2'}>
            <Tabs.Trigger value="project-info">Project Info</Tabs.Trigger>
            <Tabs.Trigger value="sections">Sections</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="project-info">
            <ProjectInfoForm project={project} setProject={setProject} />
          </Tabs.Content>

          <Tabs.Content value="sections">
            <SectionsForm project={project} setProject={setProject} />
          </Tabs.Content>
        </Tabs.Root>

        <Separator size={'4'} mb={'4'} color={'gray'} />

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button
              variant="soft"
              size={'3'}
              color="gray"
              onClick={handleCancelChange}
            >
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Form.Submit asChild>
              <Button size={'3'} asChild>
                <button type="submit">{actionButtonLabel}</button>
              </Button>
            </Form.Submit>
          </Dialog.Close>
        </Flex>
      </Form.Root>
    </Dialog.Content>
  );
}

export default ProjectDialog;
