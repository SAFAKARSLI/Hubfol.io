import React from 'react';
import AccordionProjectList from './AccordionProjectList';
import Project from '@/types/project';
import { Flex } from '@radix-ui/themes';
import ProjectListHeader from './ProjectListHeader';
import AddProjectButton from './AddProjectButton';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { auth, User } from '@clerk/nextjs/server';
import ProfileOverview from './ProfileOverview';
import { getUser } from '@/app/actions/user';

type Props = {
  initialProjects: Project[];
  username: string;
};

async function ProjectsSidePanel({ initialProjects, username }: Props) {
  const { userId } = auth();

  const user = (await getUser(userId!)) as User;
  return (
    <div className="flex flex-col h-[100dvh] bg-gray-1 border-r  border-gray-4 w-[27rem]">
      <ProfileOverview username={username} />
      <div className="overflow-y-scroll flex-1  scroll-smooth border-t border-gray-4">
        <ProjectListHeader projectCount={initialProjects.length} />
        <AccordionProjectList initialProjects={initialProjects} />
        <div className="mb-[15rem] p-5">
          {user?.username == username && <AddProjectButton />}
        </div>
      </div>
    </div>
  );
}

export default ProjectsSidePanel;
