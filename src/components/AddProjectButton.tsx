'use client';
import React, { SetStateAction, useEffect, useState } from 'react';

import { PlusIcon } from '@radix-ui/react-icons';
import { cloneDeep } from 'lodash';
import { Flex, Box, Dialog, Button, Tabs, Separator } from '@radix-ui/themes';

import { createProject } from '@/app/actions';
import Project from '@/types/project';

import { defaultSections } from '@/utils';
import ProjectDialog from './ProjectDialog';

import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

type Props = {
  userUUID: string;
};

function AddProjectButton({ userUUID }: Props) {
  const [newProject, setNewProject] = useState({
    sections: cloneDeep(defaultSections),
  } as Project);
  const [dialog, setDialog] = useState(false);
  const router = useRouter();

  const handleCreateProject = async () => {
    newProject.ownerId = userUUID;
    newProject.projectUUID = uuidv4();
    await createProject(JSON.parse(JSON.stringify(newProject)), userUUID);
    router.push(`/users/${userUUID}/projects/${newProject.projectUUID}`);
  };

  return (
    <Box className={`px-2 w-full`}>
      <Dialog.Root
        open={dialog}
        onOpenChange={() => {
          !dialog && setNewProject({ sections: defaultSections });
        }}
      >
        <Dialog.Trigger>
          <Button
            variant="ghost"
            className="cursor-pointer rounded h-12 w-full my-0 "
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
