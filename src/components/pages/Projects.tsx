import React, { cloneElement } from 'react';
import Project from '@/types/project';
import ProjectsSidePanel from '../ProjectsSidePanel';
import { redirect } from 'next/navigation';
import { baseUrl } from '@/utils';

interface ProjectsProps {
  username: string;
  children?: React.ReactNode;
  activeProjectId?: string;
}

const Projects = async ({
  username,
  children,
  activeProjectId,
}: ProjectsProps) => {
  const projects = (await fetch(
    `${baseUrl}/api/projects?username=${username}`,
    {
      next: {
        tags: ['projects', 'sections'],
      },
    }
  ).then((r) => r.json())) as Project[];

  let project: Project | undefined;
  if (activeProjectId) {
    project = projects.find((project) => project.uuid === activeProjectId);

    if (!project) redirect(`/u/${username}/projects?error=project-not-found`);
  }

  return (
    <div className="flex ">
      <div className="flex-none">
        <ProjectsSidePanel initialProjects={projects} username={username} />
      </div>

      <div className="flex-1 bg-gray-0 relative">
        {cloneElement(children as React.ReactElement, { project })}
      </div>
    </div>
  );
};

export default Projects;
