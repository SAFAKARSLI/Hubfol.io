import React from 'react';
import ProfileOverview from './ProfileOverview';
import { Flex, Separator, DropdownMenu, IconButton } from '@radix-ui/themes';
import { FaGoogle } from 'react-icons/fa';
import {
  EnvelopeClosedIcon,
  HamburgerMenuIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import { Params, SlugProps } from '@/types/slug';
import SignOutButton from './SignOutButton';
import MiniProfileOverview from './MiniProfileOverview';
import OAuthSignInButton from './OAuthSignInButton';
import NavigationLinks from './NavigationLinks';
import SidebarButton from './SidebarButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import SendProposalButton from './SendProposalButton';

interface TopBarProps {
  params: Params;
}

async function TopBar({ params }: TopBarProps) {
  const userUUID = params.userUUID;
  const projectUUID = params.projectUUID;
  const session = await getServerSession(authOptions);

  return (
    <Flex>
      <ProfileOverview userUUID={userUUID} />
      <div className="flex border-y border-gray-5 bg-gray-1  px-8 -md:px-3 w-screen -xl:h-[5rem] h-[6rem] items-center">
        <MiniProfileOverview userUUID={userUUID} activeProject={projectUUID} />
        <div className="grow flex justify-center -lg:hidden">
          <div className="max-w-[45rem] w-[40rem] -2xl:w-[28rem] -xl:w-[25rem]   h-full">
            <NavigationLinks />
          </div>
        </div>

        <Flex align={'center'}>
          {/* <SendProposalButton /> */}

          <Separator orientation="vertical" size="2" className="mx-3" />

          <div className="-lg:hidden mr-3">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <IconButton variant="ghost" size={'3'} className="flex">
                  <PersonIcon className="w-5 h-5" />
                  <DropdownMenu.TriggerIcon />
                </IconButton>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item asChild>
                  <div className="flex justify-start items-center ">
                    {!session?.user ? (
                      <OAuthSignInButton
                        OAuthType="google"
                        label="Sign in with Google"
                        logo={<FaGoogle />}
                        userUUID={userUUID}
                      />
                    ) : (
                      <SignOutButton userUUID={userUUID} />
                    )}
                  </div>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>

          <div className="lg:hidden">
            <SidebarButton
              icon={<HamburgerMenuIcon />}
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
