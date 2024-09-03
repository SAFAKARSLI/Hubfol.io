import React, { act } from 'react';

import AccordionProjectList from './AccordionProjectList';
import Project from '@/types/project';
import ProjectFrame from './ProjectFrame';
import { Box, Flex } from '@radix-ui/themes';
import { getProjects } from '@/app/actions';
import ProjectConsole from './ProjectConsole';

interface ProjectsProps {
  activeProjectId?: string;
  userUUID: string;
}

const Projects = async ({ activeProjectId, userUUID }: ProjectsProps) => {
  const projects = (await getProjects(userUUID)) as Project[];

  return (
    <div className="flex w-full">
      <div className="flex-none">
        <AccordionProjectList
          initialProjects={projects}
          activeProjectId={activeProjectId!}
        />
      </div>
      <div className="h-full w-full p-8">
        <ProjectFrame activeProjectId={activeProjectId!} />
      </div>
      {activeProjectId && (
        <ProjectConsole
          project={projects.find((e) => activeProjectId == e.projectUUID)!}
        />
      )}
    </div>
  );
};

export default Projects;
