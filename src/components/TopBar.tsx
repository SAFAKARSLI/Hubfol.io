import React from 'react';
import { Flex, Separator } from '@radix-ui/themes';
import { Params } from '@/types/slug';
import NavigationLinks from './NavigationLinks';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import SidebarButton from './custom-comps/SidebarButton';

interface TopBarProps {
  params: Params;
}

async function TopBar({ params }: TopBarProps) {
  const { userUUID, projectUUID } = params;
  const session = await getServerSession(authOptions);

  return (
    <Flex className="border-b border-gray-5 bg-gray-0 justify-end items-center h-[3rem]">
      {/* <ProfileOverview userUUID={userUUID} /> */}
      <div className="flex px-5 -md:px-3 justify-between w-full items-center">
        {/* <MiniProfileOverview userUUID={userUUID} activeProject={projectUUID} /> */}

        <NavigationLinks />

        <Flex align={'center'}>
          <Separator orientation="vertical" size="1" className="mx-5" />

          <div>
            <SidebarButton
              session={session}
              iconVariant="surface"
              position="right"
            />
          </div>
        </Flex>
      </div>
    </Flex>
  );
}

export default TopBar;
