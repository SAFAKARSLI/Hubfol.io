import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import {
  Badge,
  DropdownMenu,
  Button,
  IconButton,
  Text,
  Flex,
  Box,
} from '@radix-ui/themes';
import { getServerSession, User } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import React from 'react';
import ViewContactInfo from './ViewContactInfo';
import { getUser } from '@/app/actions';
import { WithId } from 'mongodb';

interface ProfileOverviewProps {
  userUUID: string;
}

const ProfileOverview = async ({ userUUID }: ProfileOverviewProps) => {
  const session = await getServerSession(authOptions);

  const user = (await getUser(userUUID)) as WithId<User>;

  return (
    <Flex
      height="6rem"
      width="27rem"
      minWidth={'27rem'}
      px="8"
      py="4"
      className="bg-gray-1  border border-gray-4"
    >
      <Flex flexGrow="1" justify={'between'} direction={'column'}>
        <Flex direction={'column'} gap={'1'}>
          <Flex gap={'2'}>
            <Text as="p" size="2" weight="medium">
              {user.name}{' '}
            </Text>
            <Badge>Open to Work</Badge>
          </Flex>
          <Text size="1" color="gray">
            {user.title}
          </Text>
        </Flex>
        <Box>
          <ViewContactInfo user={user} />
        </Box>
      </Flex>
      <Flex
        direction={'column'}
        justify={'between'}
        align={'end'}
        height={'full'}
      >
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <IconButton variant="ghost" color="gray" radius="medium">
              <DotsHorizontalIcon width="16" height="16" />
            </IconButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content size="1">
            <DropdownMenu.Item>Share</DropdownMenu.Item>
            <DropdownMenu.Item>View full profile</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <Badge size="2" variant="soft" radius="medium">
          ${user.hourlyRate}/hr
        </Badge>
      </Flex>
    </Flex>
  );
};

export default ProfileOverview;
