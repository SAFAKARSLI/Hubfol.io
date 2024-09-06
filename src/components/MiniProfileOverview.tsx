import { CardStackIcon } from '@radix-ui/react-icons';
import { DropdownMenu, IconButton, ScrollArea, Text } from '@radix-ui/themes';
import React from 'react';
import { getProjects, getUser, openProject } from '@/app/actions';
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
  const colorOption = preferredColorOptions.accentColor;

  return (
    <div
      className={`xl:hidden h-3/4 w-[15rem] bg-violet-1 rounded border border-violet-6 p-3 flex justify-between items-center`}
    >
      <div className="flex flex-col">
        <Text className="text-sm font-bold ">{user.name}</Text>
        <Text className="text-xs" color="gray">
          {user.title}
        </Text>
      </div>
      <HamburgerProjectMenu projects={projects} userUUID={userUUID} />
    </div>
  );
}

export default MiniProfileOverview;
