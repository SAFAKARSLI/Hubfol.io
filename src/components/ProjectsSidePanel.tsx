import React from 'react';
import AccordionProjectList from './AccordionProjectList';
import Project from '@/types/project';
import { Flex } from '@radix-ui/themes';
import ProjectListHeader from './ProjectListHeader';
import AddProjectButton from './AddProjectButton';

type Props = {
  initialProjects: Project[];
  userUUID: string;
};

function ProjectsSidePanel({ initialProjects, userUUID }: Props) {
  return (
    <div className="flex flex-col gap-5 h-[calc(100vh-6rem)] py-5 gap-5 bg-gray-1 border-x border-b border-gray-4 w-[27rem] -2xl:w-[24rem] -xl:hidden overflow-y-scroll scroll-smooth">
      <ProjectListHeader projectCount={initialProjects.length} />
      <AccordionProjectList initialProjects={initialProjects} />
      <div className="mb-[15rem] px-5">
        <AddProjectButton userUUID={userUUID} />
      </div>
    </div>
  );
}

export default ProjectsSidePanel;
