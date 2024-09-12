import React, { Suspense } from 'react';

import Project from '@/types/project';
import ProjectFrame from '../ProjectFrame';
import { getProjects } from '@/app/actions';
import NoActiveProjectBanner from '../NoActiveProjectBanner';
import { Spinner } from '@radix-ui/themes';
import ProjectsSidePanel from '../ProjectsSidePanel';

interface ProjectsProps {
  activeProjectId?: string;
  userUUID: string;
  children?: React.ReactNode;
}

const Projects = async ({
  activeProjectId,
  userUUID,
  children,
}: ProjectsProps) => {
  const projects = (await getProjects(userUUID)) as Project[];

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
