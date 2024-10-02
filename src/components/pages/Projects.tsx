import React, { cloneElement } from 'react';

import Project from '@/types/project';
import ProjectsSidePanel from '../ProjectsSidePanel';
import next from 'next';
import { notFound, redirect } from 'next/navigation';
import { baseUrl } from '@/utils';
import NoActiveProjectBanner from '../NoActiveProjectBanner';

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
        tags: ['projects', 'sections'],
      },
    }
  ).then((r) => r.json())) as Project[];

  let project: Project | undefined;
  if (activeProjectId) {
    project = projects.find((project) => project.uuid === activeProjectId);

    if (!project) redirect(`/u/${userUUID}/projects?error=project-not-found`);
  }

  return (
    <div className="flex">
      <div className="flex-none">
        <ProjectsSidePanel initialProjects={projects} userUUID={userUUID} />
      </div>

      <div className="flex-1 m-3 relative h-[calc(100dvh-8rem)] rounded overflow-hidden">
        {cloneElement(children as React.ReactElement, { project })}
      </div>
    </div>
  );
};

export default Projects;
