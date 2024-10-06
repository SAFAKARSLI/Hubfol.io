import React from 'react';
import AccordionProjectList from './AccordionProjectList';
import Project from '@/types/project';
import { Flex } from '@radix-ui/themes';
import ProjectListHeader from './ProjectListHeader';
import AddProjectButton from './AddProjectButton';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import ProfileOverview from './ProfileOverview';

type Props = {
  initialProjects: Project[];
  userUUID: string;
};

async function ProjectsSidePanel({ initialProjects, userUUID }: Props) {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col h-[100dvh] bg-gray-1 border-r  border-gray-4 w-[27rem]">
      <ProfileOverview userUUID={userUUID} />
      <div className="overflow-y-scroll flex-1  scroll-smooth border-t border-gray-4">
        <ProjectListHeader projectCount={initialProjects.length} />
        <AccordionProjectList initialProjects={initialProjects} />
        <div className="mb-[15rem] p-5">
          {session?.user.uuid == userUUID && <AddProjectButton />}
        </div>
      </div>
    </div>
  );
}

export default ProjectsSidePanel;
