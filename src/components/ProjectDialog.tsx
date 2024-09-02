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
import { set } from 'lodash';

type Props = {
  title: string;
  actionButtonLabel: string;
  onSubmit: () => void;
  project: Project;
  setProject: (project: Project) => void;
  setDialog: (open: boolean) => void;
};

function ProjectDialog({
  title,
  actionButtonLabel,
  onSubmit,
  project,
  setProject,
  setDialog,
}: Props) {
  return (
    <Dialog.Content
      maxWidth="50rem"
      onEscapeKeyDown={(e) => e.preventDefault()}
      onInteractOutside={(e) => e.preventDefault()}
    >
      <div className="w-full flex justify-between">
        <Dialog.Title size={'6'}>{title}</Dialog.Title>
        <Dialog.Close>
          <IconButton
            className="cursor-pointer"
            variant="ghost"
            size={'2'}
            onClick={() => {
              setDialog(false);
            }}
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

      <Separator size={'4'} mb={'4'} />

      <Flex gap="3" mt="4" justify="end">
        <Dialog.Close>
          <Button
            variant="soft"
            size={'3'}
            color="gray"
            onClick={() => setDialog(false)}
          >
            Cancel
          </Button>
        </Dialog.Close>
        <Dialog.Close>
          <Button
            onClick={() => {
              onSubmit();
              setDialog(false);
            }}
            size={'3'}
          >
            {actionButtonLabel}
          </Button>
        </Dialog.Close>
      </Flex>
    </Dialog.Content>
  );
}

export default ProjectDialog;
