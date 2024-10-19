import React from 'react';
import AccordionProjectList from './AccordionProjectList';
import Project from '@/types/project';
import ProjectListHeader from './ProjectListHeader';
import AddProjectButton from './AddProjectButton';

import { auth, User } from '@clerk/nextjs/server';
import ProfileOverview from './ProfileOverview';
import { getUser } from '@/app/actions/user';

type Props = {
  initialProjects: Project[];
  username: string;
  projectSlug: string;
};

async function ProjectsSidePanel({
  initialProjects,
  username,
  projectSlug,
}: Props) {
  const { userId } = auth();

  const user = (await getUser(userId!)) as User;
  return (
    <div className="flex flex-col h-[100dvh]  w-[27rem]">
      <ProfileOverview username={username} />
      <div className="overflow-y-scroll flex-1  scroll-smooth ">
        <ProjectListHeader projectCount={initialProjects.length} />
        <AccordionProjectList
          initialProjects={initialProjects}
          activeProjectId={projectSlug}
        />
        <div className="mb-[15rem] p-5">
          {user?.username == username && <AddProjectButton />}
        </div>
      </div>
    </div>
  );
}

export default ProjectsSidePanel;
