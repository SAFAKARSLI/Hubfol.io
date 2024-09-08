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
    <div className={`xl:hidden flex w-full items-center h-full gap-3`}>
      <HamburgerProjectMenu projects={projects} userUUID={userUUID} />
      <div className="text-center overflow-hidden flex-1 w-[8rem]">
        <p className="text-sm font-bold truncate block text-nowrap">
          {user.name}
        </p>
        <p className="text-xs truncate text-gray-400 truncate block">
          {user.title}
        </p>
      </div>
    </div>
  );
}

export default MiniProfileOverview;
