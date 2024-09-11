'use client';
import React, { SetStateAction, useEffect, useState } from 'react';

import { FilePlusIcon, PlusIcon } from '@radix-ui/react-icons';
import { cloneDeep } from 'lodash';
import { Flex, Box, Dialog, Button, Tabs, Separator } from '@radix-ui/themes';

import { createProject } from '@/app/actions';
import Project from '@/types/project';

import { buttonVariants, defaultSections } from '@/utils';
import ProjectDialog from './ProjectDialog';

import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

type Props = {
  userUUID: string;
  onSubmit?: () => void;
  variant?: buttonVariants;
};

function AddProjectButton({ userUUID, onSubmit, variant = 'soft' }: Props) {
  const [newProject, setNewProject] = useState({
    sections: cloneDeep(defaultSections),
    iconLink: '',
  } as Project);
  const [dialog, setDialog] = useState(false);
  const router = useRouter();

  const handleCreateProject = async () => {
    await createProject(JSON.parse(JSON.stringify(newProject)), userUUID);
    onSubmit && onSubmit();
  };

  return (
    <Box>
      <Dialog.Root
        open={dialog}
        onOpenChange={() => {
          !dialog && setNewProject({ sections: defaultSections });
        }}
      >
        <Dialog.Trigger>
          <Button
            variant={variant}
            className="cursor-pointer rounded h-12 w-full "
            onClick={() => setDialog(true)}
          >
            <PlusIcon /> Add Project
          </Button>
        </Dialog.Trigger>

        <ProjectDialog
          actionButtonLabel="Create Project"
          onSubmit={handleCreateProject}
          title="Create New Project"
          project={newProject}
          setProject={setNewProject}
          setDialog={setDialog}
          initialProject={newProject}
        />
      </Dialog.Root>
    </Box>
  );
}

export default AddProjectButton;
