import React from 'react';

import AccordionProjectList from './AccordionProjectList';
import Project from '@/types/project';
import ProjectFrame from './ProjectFrame';
import { getProjects } from '@/app/actions';
import NoActiveProjectBanner from './NoActiveProjectBanner';

interface ProjectsProps {
  activeProjectId?: string;
  userUUID: string;
}

const Projects = async ({ activeProjectId, userUUID }: ProjectsProps) => {
  const projects = (await getProjects(userUUID)) as Project[];

  return (
    <div className="flex w-screen">
      <div className="flex-none">
        <AccordionProjectList
          initialProjects={projects}
          activeProjectId={activeProjectId!}
        />
      </div>
      <div className="flex-1 w-full m-3">
        {activeProjectId ? (
          <ProjectFrame
            project={projects.find((e) => e.projectUUID === activeProjectId)}
          />
        ) : (
          <NoActiveProjectBanner />
        )}
      </div>
    </div>
  );
};

export default Projects;
