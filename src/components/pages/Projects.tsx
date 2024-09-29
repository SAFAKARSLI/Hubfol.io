import React, { cloneElement } from 'react';

import Project from '@/types/project';
import ProjectsSidePanel from '../ProjectsSidePanel';
import next from 'next';
import { notFound } from 'next/navigation';
import { baseUrl } from '@/utils';

interface ProjectsProps {
  userUUID: string;
  children?: React.ReactNode;
  activeProjectId?: string;
}

const Projects = async ({
  userUUID,
  children,
  activeProjectId,
}: ProjectsProps) => {
  const projects = (await fetch(
    `${baseUrl}/api/projects?userUUID=${userUUID}`,
    {
      next: {
        tags: ['projects'],
      },
    }
  ).then((r) => r.json())) as Project[];

  const props = projects.find((project) => project.uuid === activeProjectId);
  console.log(props);

  return (
    <div className="flex w-screen h-full">
      <div className="flex-none">
        <ProjectsSidePanel initialProjects={projects} userUUID={userUUID} />
      </div>

      <div className="flex-1 m-3">
        {cloneElement(children as React.ReactElement, { props })}
      </div>
    </div>
  );
};

export default Projects;
