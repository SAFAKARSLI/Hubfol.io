import React from 'react';
import ProfileOverview from './ProfileOverview';
import {
  Flex,
  Button,
  Separator,
  DropdownMenu,
  IconButton,
} from '@radix-ui/themes';
import { FaGoogle } from 'react-icons/fa';
import { EnvelopeClosedIcon, PersonIcon } from '@radix-ui/react-icons';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Params, SlugProps } from '@/types/slug';
import SignOutButton from './SignOutButton';
import MiniProfileOverview from './MiniProfileOverview';
import OAuthSignInButton from './OAuthSignInButton';
import NavigationLinks from './NavigationLinks';
import SidebarButton from './SidebarButton';

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
      <Flex
        justify={'between'}
        className="border-y border-gray-4 bg-gray-1 px-8 -md:px-4 w-full -xl:h-[5rem] h-[6rem] items-center justify-center"
      >
        <MiniProfileOverview userUUID={userUUID} activeProject={projectUUID} />
        <div className="flex-1 flex justify-center">
          <div className="max-w-[45rem] w-[40rem] -2xl:w-[28rem]  -xl:w-[25rem] -lg:hidden mx-9">
            <NavigationLinks userUUID={userUUID} />
          </div>
        </div>

        <Flex gap={'5'} align={'center'} className="flex-none">
          <Button size={'2'} className="-xl:hidden">
            <EnvelopeClosedIcon /> Send Proposal
          </Button>

          <Separator orientation="vertical" size="2" />

          <div className="-lg:hidden">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <IconButton variant="ghost" size={'3'} className="flex gap-1">
                  <PersonIcon className="w-5 h-5" />
                  <DropdownMenu.TriggerIcon />
                </IconButton>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item asChild>
                  <div className="flex justify-start items-center w-full">
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

                <DropdownMenu.Separator className="xl:hidden" />

                <DropdownMenu.Item className="xl:hidden">
                  <EnvelopeClosedIcon />
                  Send Proposal
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>

          <div className="lg:hidden">
            <SidebarButton />
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default TopBar;
