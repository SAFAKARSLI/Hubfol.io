'use client';
import React from 'react';
import { Button, IconButton } from '@radix-ui/themes';
import { Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import { links, preferredColorOptions } from '@/utils';
import Link from 'next/link';
import NavigationLinks from './NavigationLinks';
import { useParams } from 'next/navigation';

type Props = {};

function SidebarButton({}: Props) {
  const [visible, setVisible] = React.useState(false);
  const { userUUID } = useParams();
  return (
    <div>
      <IconButton
        variant="surface"
        size={'3'}
        onClick={() => setVisible(!visible)}
      >
        <HamburgerMenuIcon />
      </IconButton>

      <div
        className={`flex flex-col justify-between p-3 gap-3 fixed bottom-0 left-0 h-full bg-gray-1 border border-gray-4 w-[15rem] transition-transform duration-300 z-20 ${
          visible ? 'transform translate-x-0' : 'transform -translate-x-full'
        }`}
      >
        <div className="flex justify-end">
          <IconButton variant="ghost" onClick={() => setVisible(false)}>
            <Cross1Icon />
          </IconButton>
        </div>
        <div className="flex flex-col  flex-1">
          <div className="h-[15rem] mt-9">
            <NavigationLinks
              isCol
              userUUID={userUUID as string}
              onClick={() => setVisible(false)}
            />
          </div>
        </div>
      </div>
      <div
        className={` fixed left-0 top-0 right-0 bottom-0 bg-violet-a13 z-10 ${
          !visible && 'hidden'
        }`}
      ></div>
    </div>
  );
}

export default SidebarButton;
