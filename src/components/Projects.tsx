import React, { Suspense } from 'react';

import AccordionProjectList from './AccordionProjectList';
import Project from '@/types/project';
import ProjectFrame from './ProjectFrame';
import { getProjects } from '@/app/actions';
import NoActiveProjectBanner from './NoActiveProjectBanner';
import { Spinner } from '@radix-ui/themes';
import ProjectsSidePanel from './ProjectsSidePanel';

interface ProjectsProps {
  activeProjectId?: string;
  userUUID: string;
}

const Projects = async ({ activeProjectId, userUUID }: ProjectsProps) => {
  const projects = (await getProjects(userUUID)) as Project[];

  return (
    <div className="flex w-screen">
      <div className="flex-none">
        <ProjectsSidePanel initialProjects={projects} userUUID={userUUID} />
      </div>
      <div className="flex-1 w-full m-3">
        {activeProjectId ? (
          <Suspense
            fallback={
              <div className="w-full flex items-center justify-center pt-6">
                <Spinner />
              </div>
            }
          >
            <ProjectFrame
              // project={projects.find((e) => e.projectUUID === activeProjectId)}
              projectUUID={activeProjectId}
            />
          </Suspense>
        ) : (
          <NoActiveProjectBanner />
        )}
      </div>
    </div>
  );
};

export default Projects;
