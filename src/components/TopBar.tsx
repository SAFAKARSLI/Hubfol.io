import React from 'react';
import ProfileOverview from './ProfileOverview';
import {
  Flex,
  Text,
  Button,
  Link as RadixLink,
  DropdownMenu,
} from '@radix-ui/themes';
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';
import { EnvelopeClosedIcon } from '@radix-ui/react-icons';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

type Props = {};

const links: string[] = [
  'Profile Overview',
  'Projects',
  'Professional Experiences',
  'Certificates and Education',
];

const TopBar: React.FC<Props> = async ({}) => {
  const session = await getServerSession(authOptions);

  return (
    <Flex className="">
      <ProfileOverview
        userName="John DOE"
        title="Freelance Software Engineer"
        location="San Francisco, CA, USA"
        contactInfo="johndoe@hubfol.io"
      />
      <Flex
        px={'8rem'}
        justify={'between'}
        className="border-y border-gray-4 w-full bg-gray-1"
      >
        <Flex
          justify={'between'}
          align={'center'}
          height={'100%'}
          width={'60%'}
        >
          {links.map((link, i) => (
            <Text
              as={'div'}
              size={'2'}
              color="gray"
              key={i}
              className="hover:text-white"
            >
              <Link href={'/' + link.toLowerCase().replaceAll(' ', '-')}>
                {link}
              </Link>
            </Text>
          ))}
        </Flex>
        <Flex gap={'5rem'} align={'center'}>
          <Button size={'3'}>
            <EnvelopeClosedIcon /> Send Proposal
          </Button>

          {!session?.user ? (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button variant="ghost" size={'3'}>
                  Sign In
                  <DropdownMenu.TriggerIcon />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item color="red">
                  <FaGoogle />
                  <Link href={'/api/auth/signin'}>Sign In With Google</Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          ) : (
            <RadixLink href={'/api/auth/signout'}>Sign Out</RadixLink>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TopBar;
