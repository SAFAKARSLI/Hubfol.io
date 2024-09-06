import { Text } from '@radix-ui/themes';
import React from 'react';
import { getProjects, getUser } from '@/app/actions';
import Project from '@/types/project';
import { WithId } from 'mongodb';
import { User } from 'next-auth';
import HamburgerProjectMenu from './HamburgerProjectMenu';
import { preferredColorOptions } from '@/utils';

type Props = {
  userUUID: string;
  activeProject?: string;
};

async function MiniProfileOverview({ userUUID }: Props) {
  const user = (await getUser(userUUID)) as WithId<User>;
  const projects = (await getProjects(userUUID)) as Project[];
  return (
    <div className={`xl:hidden flex items-center h-full w-[15rem] gap-2`}>
      <HamburgerProjectMenu projects={projects} userUUID={userUUID} />
      <div className="w-full">
        <p className="text-sm  font-bold truncate ">{user.name}</p>
        <p className="text-xs truncate text-gray-400 ">{user.title}</p>
      </div>
    </div>
  );
}

export default MiniProfileOverview;
