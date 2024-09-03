import React from 'react';
import ProfileOverview from './ProfileOverview';
import {
  Flex,
  Text,
  Button,
  Separator,
  Link as RadixLink,
  DropdownMenu,
  IconButton,
} from '@radix-ui/themes';
import Link from 'next/link';
import { FaGoogle, FaSignInAlt } from 'react-icons/fa';
import { EnvelopeClosedIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { SlugProps } from '@/types/slug';
import AuthenticationButton from './AuthenticationButton';
import HamburgerMenu from './HamburgerMenu';

const links: string[] = [
  'Profile Overview',
  'Projects',
  'Publishings',
  'Reviews',
];

async function TopBar({ params, children }: SlugProps) {
  const userUUID = params.userUUID;
  const projectUUID = params.projectUUID;
  const session = await getServerSession(authOptions);

  return (
    <Flex>
      <ProfileOverview userUUID={userUUID} />
      <Flex
        justify={'between'}
        className="border-y border-gray-4 bg-gray-1 px-8 w-full -xl:h-[5rem] h-[6rem] items-center"
      >
        <HamburgerMenu userUUID={userUUID} activeProject={projectUUID} />

        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center h-full justify-between text-center  w-[40rem] -2xl:w-[32rem]  -xl:w-[28rem]">
            {links.map((link, i) => (
              <Text
                as={'div'}
                size={'2'}
                color="gray"
                key={i}
                className="hover:text-white header-link -2xl:text-xs"
              >
                <Link
                  href={`/users/${userUUID}/${link
                    .toLowerCase()
                    .replaceAll(' ', '-')}`}
                >
                  {link}
                </Link>
              </Text>
            ))}
          </div>
        </div>
        <Flex gap={'5'} align={'center'} className="flex-none">
          <Button size={'2'}>
            <EnvelopeClosedIcon /> Send Proposal
          </Button>

          <Separator orientation="vertical" size="2" />

          {!session?.user ? (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button variant="ghost" size={'2'}>
                  <FaSignInAlt className="mr-1" />
                  Sign In
                  <DropdownMenu.TriggerIcon />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item color="red">
                  <FaGoogle color="white" />
                  <AuthenticationButton
                    label={'Sign In With Google'}
                    userUUID={userUUID}
                  />
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          ) : (
            <AuthenticationButton label={'Sign Out'} userUUID={userUUID} />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default TopBar;
