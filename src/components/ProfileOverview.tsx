import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import {
  Badge,
  DropdownMenu,
  IconButton,
  Text,
  Flex,
  Box,
  Separator,
  Portal,
} from '@radix-ui/themes';
import React, { cache } from 'react';
import ViewContactInfo from './ViewContactInfo';
import { baseUrl } from '@/utils';
import Employee from '@/types/employee';
import Image from 'next/image';

interface ProfileOverviewProps {
  username: string;
}

const ProfileOverview = async ({ username }: ProfileOverviewProps) => {
  const user = (await fetch(`${baseUrl}/api/users/${username}`, {
    cache: 'force-cache',
    next: { tags: ['users'] },
  }).then((r) => r.json())) as Employee;

  return (
    <div
      className="flex bg-gray-1 h-[6rem] -sm:hidden items-center p-5  shadow-[-5px_8px_20px_1px_rgba(0,0,0,1)] "
      style={{ zIndex: 0 }}
    >
      <Image
        alt="pp"
        src={'/hubfolio-dark-logo.png'}
        width={60}
        height={60}
        style={{ objectFit: 'cover' }}
        className="mr-5"
      />
      <Flex direction="column" className="flex-grow" justify={'between'}>
        <div>
          <Text as="p" size="2" weight="bold">
            {user.name}{' '}
          </Text>

          <Text size="1" color="gray" as="p">
            {user.title}
          </Text>
        </div>
        <div>
          <Badge variant="soft">{user.status.replaceAll('_', ' ')}</Badge>
        </div>
      </Flex>
      <Flex
        className="flex-grow"
        direction={'column'}
        justify={'between'}
        align={'end'}
        height={'100%'}
      >
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <IconButton variant="ghost" color="gray" size={'1'}>
              <DotsHorizontalIcon />
            </IconButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content size="1">
            <DropdownMenu.Item>Share</DropdownMenu.Item>
            <DropdownMenu.Item>View full profile</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        {/* <Badge size="2" variant="soft" radius="medium">
          ${user.hourlyRate}/hr
        </Badge> */}
        <ViewContactInfo user={user} />
      </Flex>
    </div>
  );
};

export default ProfileOverview;
