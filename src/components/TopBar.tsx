import React from 'react';
import { Flex, Separator } from '@radix-ui/themes';
import { Params } from '@/types/slug';
import NavigationLinks from './NavigationLinks';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import SidebarButton from './custom-comps/SidebarButton';
import SignInButton from './SignInButton';
import SignUpButton from './SignUpButton';

interface TopBarProps {
  params: Params;
}

async function TopBar({ params }: TopBarProps) {
  const { userUUID, projectUUID } = params;
  const session = await getServerSession(authOptions);

  return (
    <Flex className="border-b border-gray-5 bg-gray-0 justify-end items-center h-[3.5rem]">
      <div className="flex  justify-between w-full items-center">
        <NavigationLinks authenticated={session?.user.uuid == userUUID} />
        <Flex align={'center'} className="mr-5">
          {session ? (
            <>
              <Separator orientation="vertical" size="1" className="mx-5" />
              <div>
                <SidebarButton session={session} position="right" />
              </div>
            </>
          ) : (
            <>
              <SignInButton />
              <Separator orientation="vertical" size="1" className="mx-5" />
              <SignUpButton />
            </>
          )}
        </Flex>
      </div>
    </Flex>
  );
}

export default TopBar;
