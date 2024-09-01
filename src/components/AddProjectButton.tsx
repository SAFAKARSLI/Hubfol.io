'use client';
import React, { SetStateAction, useEffect, useState } from 'react';

import { PlusIcon } from '@radix-ui/react-icons';
import { cloneDeep } from 'lodash';
import { Flex, Box, Dialog, Button, Tabs, Separator } from '@radix-ui/themes';

import { createProject } from '@/app/actions';
import Project from '@/types/project';
import SectionsForm from './SectionsForm';
import ProjectInfoForm from './ProjectInfoForm';
import { defaultSections } from '@/utils';
import { useRouter } from 'next/navigation';

type Props = {
  userUUID: string;
  updateProjects: React.Dispatch<SetStateAction<Project[]>>;
  projectList: Project[];
};

function AddProjectButton({ userUUID, updateProjects, projectList }: Props) {
  const router = useRouter();
  const [newProject, setNewProject] = useState({
    sections: cloneDeep(defaultSections),
  } as Project);

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
    // console.log(status);
    updateProjects([...projectList, projectFromDb]);
  };

  return (
    <Box className={`mx-7 mb-[12rem]`}>
      <Dialog.Root
        onOpenChange={() => setNewProject({ sections: defaultSections })}
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
          <Dialog.Title size={'6'}>Create New Project</Dialog.Title>

          <Tabs.Root defaultValue="project-info">
            <Tabs.List size={'2'}>
              <Tabs.Trigger value="project-info">Project Info</Tabs.Trigger>
              <Tabs.Trigger value="sections">Sections</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="project-info">
              <ProjectInfoForm
                newProject={newProject}
                setNewProject={setNewProject}
              />
            </Tabs.Content>

            <Tabs.Content value="sections">
              <SectionsForm
                newProject={newProject}
                setNewProject={setNewProject}
              />
            </Tabs.Content>
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
