import React from 'react';
import HamburgerProjectMenu from './HamburgerProjectMenu';
import { getUser } from '@/app/actions/user';
import Project from '@/types/project';
import { baseUrl } from '@/utils';
import { User } from '@prisma/client';
import Employee from '@/types/employee';

type Props = {
  userUUID: string;
  activeProject?: string;
};

async function MiniProfileOverview({ userUUID }: Props) {
  const user = (await fetch(`${baseUrl}/api/users/${userUUID}`).then((r) =>
    r.json()
  )) as Employee;
  const projects = (await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects?userUUID=${userUUID}`,
    { cache: 'force-cache', next: { tags: ['projects'] } }
  ).then((r) => r.json())) as Project[];

  return (
    <div className={`xl:hidden flex w-full items-center h-full gap-3`}>
      <HamburgerProjectMenu projects={projects} userUUID={userUUID} />
      <div className="text-center overflow-hidden flex-1 w-[8rem]">
        <p className="text-sm font-bold truncate block text-nowrap">
          {user?.name}
        </p>
        <p className="text-xs truncate text-gray-400 truncate block">
          {user?.title}
        </p>
      </div>
    </div>
  );
}

export default MiniProfileOverview;
