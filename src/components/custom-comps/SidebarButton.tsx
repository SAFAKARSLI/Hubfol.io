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
  FileIcon,
  HamburgerMenuIcon,
  PersonIcon,
  RocketIcon,
  StarIcon,
} from '@radix-ui/react-icons';
import { baseUrl, preferredColorOptions } from '@/utils';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import NavLink from '../NavLink';
import { Session } from 'next-auth';
import ProfileMenuDropdownButton from '../ProfileMenuDropdownButton';
import SidebarMenuLink from '../SidebarMenuLink';
import SignOutButton from '../SignOutButton';
import * as Portal from '@radix-ui/react-portal';

import ReactDOM from 'react-dom';
import SidebarProfileOverview from '../SidebarProfileOverview';

type Props = {
  position: 'left' | 'right';
  session: Session | null;
};

function SidebarButton({ position, session }: Props) {
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
      <Portal.Root>
        <div
          className={` fixed left-0 top-0 right-0 bottom-0 bg-violet-a13  ${
            !visible && 'hidden'
          }`}
          onClick={() => setVisible(false)}
        />
      </Portal.Root>

      <Portal.Root>
        <div
          className={`flex flex-col p-5 fixed bottom-0 ${menuPosition} ${menuSlideAnimation} h-full bg-gray-2 border border-gray-4 w-[18rem] duration-300 `}
        >
          <div className="flex justify-end">
            <Cross2Icon
              onClick={() => setVisible(false)}
              className="hover:bg-gray-3 p-[3px] h-6 w-6 rounded-md hover:cursor-pointer"
              color="gray"
            />
          </div>
          <SidebarProfileOverview session={session} />
          <Separator size={'4'} className="my-5" />
          <div className="flex flex-col gap-1">
            <SidebarMenuLink
              icon={<PersonIcon color="gray" className="w-5 h-5" />}
              text="My Profile"
              link={`${baseUrl}/u/${session?.user.uuid}/profile`}
              onClick={() => setVisible(false)}
            />
            <SidebarMenuLink
              icon={<RocketIcon color="gray" className="w-5 h-5" />}
              text="My Projects"
              link={`${baseUrl}/u/${session?.user.uuid}/projects`}
              onClick={() => setVisible(false)}
            />
            <SidebarMenuLink
              icon={<StarIcon color="gray" className="w-5 h-5" />}
              text="My Reviews"
              link={`${baseUrl}/u/${session?.user.uuid}/reviews`}
              onClick={() => setVisible(false)}
            />
          </div>
          <Separator size={'4'} className="my-5" />

          <SignOutButton />
        </div>
      </Portal.Root>
    </div>
  );
}

export default SidebarButton;
