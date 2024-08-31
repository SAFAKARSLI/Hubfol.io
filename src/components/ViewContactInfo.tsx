import React from 'react';
import {
  Text,
  Dialog,
  Flex,
  DataList,
  Badge,
  Code,
  IconButton,
  Link,
} from '@radix-ui/themes';
import { CopyIcon, PersonIcon } from '@radix-ui/react-icons';
import Divider from './subsections/Divider';
import { getServerSession, User } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getUser } from '@/app/actions';
import { WithId } from 'mongodb';

type Props = {
  user: User;
};

async function ViewContactInfo({ user }: Props) {
  const session = await getServerSession(authOptions);

  const renderUserInfo = async () => {
    return (
      <DataList.Root>
        <DataList.Item align="center">
          <DataList.Label minWidth="88px">Status</DataList.Label>
          <DataList.Value>
            <Badge variant="soft" radius="full">
              Authorized
            </Badge>
          </DataList.Value>
        </DataList.Item>

        <DataList.Item>
          <DataList.Label minWidth="88px">Name</DataList.Label>
          <DataList.Value>{user.name}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Email</DataList.Label>
          <DataList.Value>
            <Link href={`mailto:${user.email}`}>{user.email}</Link>
          </DataList.Value>
        </DataList.Item>

        <DataList.Item>
          <DataList.Label minWidth="88px">Location</DataList.Label>
          <DataList.Value>{user.location}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Phone Number</DataList.Label>
          <DataList.Value>{user.phoneNumber}</DataList.Value>
        </DataList.Item>
      </DataList.Root>
    );
  };

  return (
    <Dialog.Root>
      <Flex gap={'1'}>
        <PersonIcon className="h-3 w-3" />
        <Dialog.Trigger>
          <Text
            size={'1'}
            color="gray"
            className="hover:underline cursor-pointer"
          >
            Contact Info
          </Text>
        </Dialog.Trigger>
      </Flex>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Profile Information</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          <Divider />
        </Dialog.Description>
        {renderUserInfo()}
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default ViewContactInfo;
