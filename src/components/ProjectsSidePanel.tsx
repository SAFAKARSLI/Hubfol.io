import React from 'react';
import AccordionProjectList from './AccordionProjectList';
import Project from '@/types/project';
import { Flex } from '@radix-ui/themes';
import ProjectListHeader from './ProjectListHeader';
import AddProjectButton from './AddProjectButton';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

type Props = {
  initialProjects: Project[];
  userUUID: string;
};

async function ProjectsSidePanel({ initialProjects, userUUID }: Props) {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col gap-5 h-[calc(100vh-6rem)] py-5 gap-5 bg-gray-1 border-x border-b border-gray-4 w-[27rem] -2xl:w-[24rem] -xl:hidden overflow-y-scroll scroll-smooth">
      <ProjectListHeader projectCount={initialProjects.length} />
      <AccordionProjectList initialProjects={initialProjects} />
      <div className="mb-[15rem] px-5">
        {session?.user.uuid == userUUID && <AddProjectButton />}
      </div>
    </div>
  );
}

export default ProjectsSidePanel;
