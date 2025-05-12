"use client";

import React from "react";
import {
  Text,
  Dialog,
  Flex,
  DataList,
  Badge,
  Link,
  Separator,
  IconButton,
} from "@radix-ui/themes";
import { Cross1Icon, EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { Employee } from "@prisma/client";
import { formatPhoneNumberIntl } from "react-phone-number-input";

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
            <Badge
              variant="soft"
              radius="full"
              className="max-w-[15rem] text-wrap"
            >
              {user.status}
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
            {formatPhoneNumberIntl(user.phoneNumber as string)}
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>
    );
  };

  return (
    <Dialog.Root>
      <Flex gap={"2"} align={"center"}>
        <EnvelopeClosedIcon color="gray" />
        <Dialog.Trigger>
          <Text
            size={"1"}
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
          <Separator size={"4"} />
        </Dialog.Description>
        {renderUserInfo()}
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default ViewContactInfo;
