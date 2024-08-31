import React from 'react';
import ProfileOverview from './ProfileOverview';
import { signOut, signIn } from 'next-auth/react';
import {
  Flex,
  Text,
  Button,
  Separator,
  Link as RadixLink,
  DropdownMenu,
} from '@radix-ui/themes';
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';
import { EnvelopeClosedIcon } from '@radix-ui/react-icons';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { SlugProps } from '@/types/slug';
import { logIn } from '@/app/actions';
import AuthenticationButton from './AuthenticationButton';

const links: string[] = [
  'Profile Overview',
  'Projects',
  'Professional Experiences',
  'Certificates and Education',
];

async function TopBar({ params }: SlugProps) {
  const userUUID = params.userUUID;
  const session = await getServerSession(authOptions);

  return (
    <Flex className="">
      <ProfileOverview userUUID={userUUID} />
      <Flex
        justify={'between'}
        className="border-y border-gray-4 w-full bg-gray-1 px-[8rem]"
      >
        <div className="w-[15rem]"></div>
        <Flex
          align={'center'}
          height={'100%'}
          // width={'45%'}
          className="text-center gap-[8rem]"
        >
          {links.map((link, i) => (
            <Text
              as={'div'}
              size={'2'}
              color="gray"
              key={i}
              className="hover:text-white header-link"
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
        </Flex>
        <Flex gap={'5'} align={'center'} className="w-auto">
          <Button size={'2'}>
            <EnvelopeClosedIcon /> Send Proposal
          </Button>

          <Separator orientation="vertical" size="2" />

          {!session?.user ? (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button variant="ghost" size={'2'}>
                  Sign In
                  <DropdownMenu.TriggerIcon />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item color="red">
                  {/* <Link href={'/api/auth/signin'}>Sign In With Google</Link> */}
                  <FaGoogle color="white" />
                  <AuthenticationButton
                    label={'Sign In With Google'}
                    userUUID={userUUID}
                  />
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          ) : (
            // <RadixLink href={'/api/auth/signout'} size={'2'}>
            //   Sign Out
            // </RadixLink>
            <AuthenticationButton label={'Sign Out'} userUUID={userUUID} />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default TopBar;
