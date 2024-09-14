import React from 'react';

import Project from '@/types/project';
import ProjectsSidePanel from '../ProjectsSidePanel';

interface ProjectsProps {
  userUUID: string;
  children?: React.ReactNode;
}

const Projects = async ({ userUUID, children }: ProjectsProps) => {
  const projects = (await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects?uuid=${userUUID}`
  ).then((r) => r.json())) as Project[];

  return (
    <div className="flex w-screen">
      <div className="flex-none">
        <ProjectsSidePanel initialProjects={projects} userUUID={userUUID} />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Projects;
