import React from 'react';
import { Flex, Progress, Separator, Spinner } from '@radix-ui/themes';
import { Params } from '@/types/slug';
import NavigationLinks from './NavigationLinks';
import SidebarButton from './custom-comps/SidebarButton';
import { auth } from '@clerk/nextjs/server';
import { getUser } from '@/app/actions/user';
import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import AuthenticationButtonsWrapper from './AuthenticationButtonsWrapper';
import NextNProgress from 'nextjs-progressbar';
import ProgressLoadingBar from './ProgressLoadingBar';

interface TopBarProps {
  params: Params;
}

async function TopBar({ params }: TopBarProps) {
  const { username, projectUUID } = params;
  const { userId } = auth();
  const clerkUser = await getUser(userId as string);

  return (
    <>
      <Flex className="border-b border-gray-5 bg-gray-0 justify-end items-center h-[3.5rem]">
        <div className="flex  justify-between w-full items-center">
          <NavigationLinks authenticated={clerkUser?.username == username} />
          <Flex align={'center'} className="mr-5">
            <ClerkLoading>
              <Spinner />
            </ClerkLoading>
            <ClerkLoaded>
              {clerkUser ? (
                <>
                  <Separator orientation="vertical" size="1" className="mx-5" />
                  <div>
                    <SidebarButton position="right" />
                  </div>
                </>
              ) : (
                <AuthenticationButtonsWrapper />
              )}
            </ClerkLoaded>
          </Flex>
        </div>
      </Flex>
    </>
  );
}

export default TopBar;
