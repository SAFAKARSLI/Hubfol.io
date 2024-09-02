'use client';
import React, { SetStateAction, useEffect, useState } from 'react';

import { PlusIcon } from '@radix-ui/react-icons';
import { cloneDeep } from 'lodash';
import { Flex, Box, Dialog, Button, Tabs, Separator } from '@radix-ui/themes';

import { createProject } from '@/app/actions';
import Project from '@/types/project';

import { defaultSections } from '@/utils';
import ProjectDialog from './ProjectDialog';

type Props = {
  userUUID: string;
  updateProjects: React.Dispatch<SetStateAction<Project[]>>;
  projectList: Project[];
};

function AddProjectButton({ userUUID, updateProjects, projectList }: Props) {
  const [newProject, setNewProject] = useState({
    sections: cloneDeep(defaultSections),
  } as Project);
  const [dialog, setDialog] = useState(false);

  const handleCreateProject = async () => {
    const formData = new FormData();

    if (newProject.iconLink instanceof ArrayBuffer) {
      const blob = new Blob([newProject.iconLink], {
        type: 'application/octet-stream',
      });
      formData.append('iconLink', blob);
    }

    const projectFromDb = (await createProject(
      JSON.parse(JSON.stringify(newProject)),
      formData,
      userUUID
    )) as Project;
    console.log(projectFromDb);
    updateProjects([...projectList, projectFromDb]);
  };

  return (
    <Box className={`mx-7 mb-[12rem]`}>
      <Dialog.Root
        open={dialog}
        onOpenChange={() => {
          dialog && setNewProject({ ...newProject, sections: defaultSections });
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
        />
      </Dialog.Root>
    </Box>
  );
}

export default AddProjectButton;
