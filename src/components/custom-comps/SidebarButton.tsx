'use client';
import React from 'react';
import {
  Avatar,
  Button,
  Heading,
  IconButton,
  Separator,
  Text,
} from '@radix-ui/themes';
import {
  Cross1Icon,
  Cross2Icon,
  HamburgerMenuIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import { baseUrl, links, preferredColorOptions } from '@/utils';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import NavLink from '../NavLink';
import { Session } from 'next-auth';
import ProfileMenuDropdownButton from '../ProfileMenuDropdownButton';
import SidebarMenuLink from '../SidebarMenuLink';

type Props = {
  position: 'left' | 'right';
  iconVariant: 'soft' | 'surface';
  session: Session | null;
};

function SidebarButton({ iconVariant, position, session }: Props) {
  const [visible, setVisible] = React.useState(false);
  const menuPosition = position === 'left' ? `left-0` : 'right-0';
  const menuSlideAnimation =
    position === 'left'
      ? visible
        ? 'translate-x-0'
        : '-translate-x-full'
      : visible
      ? 'translate-x-0'
      : 'translate-x-full';
  return (
    <div>
      <div
        className="hover:border-gray-6 border border-gray-1 rounded-md overflow-hidden hover:cursor-pointer"
        onClick={() => setVisible(!visible)}
      >
        <Avatar
          className="h-8 w-8"
          fallback={session?.user.name[0]}
          src={session?.user.image}
        />
      </div>

      <div
        className={`flex flex-col p-5 fixed bottom-0 ${menuPosition} ${menuSlideAnimation} h-full bg-gray-2 border border-gray-4 w-[18rem] duration-300 z-20`}
      >
        <div className="flex justify-end">
          <Cross2Icon
            onClick={() => setVisible(false)}
            className="hover:bg-gray-3 p-[3px] h-6 w-6 rounded-md hover:cursor-pointer"
            color="gray"
          />
        </div>
        <div
          // onClick={() => setVisible(false)}
          className="flex h-10"
        >
          <Avatar
            className="h-full w-auto mr-3"
            fallback={session?.user.name[0]}
            src={session?.user.image}
          />
          <div className="flex flex-col justify-between">
            <Heading size={'3'}>{session?.user.name}</Heading>
            <Text color="gray" size={'2'}>
              {session?.user.username ?? 'safakarsli'}
            </Text>
          </div>
        </div>
        <Separator size={'4'} className="my-5" />
        <SidebarMenuLink
          icon={<PersonIcon color="gray" />}
          text="My Profile"
          link={`${baseUrl}/u/${session?.user.uuid}/projects`}
        />
      </div>
      <div
        className={` fixed left-0 top-0 right-0 bottom-0 bg-violet-a13 z-10 ${
          !visible && 'hidden'
        }`}
        onClick={() => setVisible(false)}
      />
    </div>
  );
}

export default SidebarButton;
