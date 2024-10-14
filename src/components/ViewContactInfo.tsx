'use client';

import React from 'react';
import {
  Text,
  Dialog,
  Flex,
  DataList,
  Badge,
  Link,
  Separator,
  IconButton,
} from '@radix-ui/themes';
import {
  Cross1Icon,
  EnvelopeClosedIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import { getServerSession, User } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Employee from '@/types/employee';
import { FaDollarSign, FaMailBulk, FaPhone, FaPhoneAlt } from 'react-icons/fa';
import { IconBase } from 'react-icons';
import { formatPhoneNumberIntl } from 'react-phone-number-input';

type Props = {
  user: Employee;
};

function ViewContactInfo({ user }: Props) {
  const renderUserInfo = async () => {
    return (
      <DataList.Root>
        <DataList.Item align="center">
          <DataList.Label minWidth="88px">Status</DataList.Label>
          <DataList.Value>
            <Badge variant="soft" radius="full">
              {user.status.replaceAll('_', ' ')}
            </Badge>
          </DataList.Value>
        </DataList.Item>

        <DataList.Item>
          <DataList.Label minWidth="88px">Name</DataList.Label>
          <DataList.Value>{user.name}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Title</DataList.Label>
          <DataList.Value>{user.title}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Email</DataList.Label>
          <DataList.Value>
            <Link href={`mailto:${user.email}`}>{user.email}</Link>
          </DataList.Value>
        </DataList.Item>

        {/* <DataList.Item>
          <DataList.Label minWidth="88px">Location</DataList.Label>
          <DataList.Value>{user.location}</DataList.Value>
        </DataList.Item> */}
        <DataList.Item>
          <DataList.Label minWidth="88px">Phone Number</DataList.Label>
          <DataList.Value>
            {formatPhoneNumberIntl(user.phoneNumber)}
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>
    );
  };

  return (
    <Dialog.Root>
      <Flex gap={'2'} align={'center'}>
        <EnvelopeClosedIcon color="gray" />
        <Dialog.Trigger>
          <Text
            size={'1'}
            className="hover:underline cursor-pointer text-gray-11"
          >
            Contact
          </Text>
        </Dialog.Trigger>
      </Flex>

      <Dialog.Content maxWidth="450px">
        <Flex className="w-full justify-between">
          <Dialog.Title>Contact Information</Dialog.Title>
          <Dialog.Close>
            <IconButton variant="ghost">
              <Cross1Icon />
            </IconButton>
          </Dialog.Close>
        </Flex>
        <Dialog.Description size="2" mb="4">
          <Separator size={'4'} />
        </Dialog.Description>
        {renderUserInfo()}
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default ViewContactInfo;
