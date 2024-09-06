'use client';
import React from 'react';
import { Button, IconButton } from '@radix-ui/themes';
import { Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import { links, preferredColorOptions } from '@/utils';
import Link from 'next/link';
import NavigationLinks from './NavigationLinks';
import { useParams } from 'next/navigation';
import NavLink from './NavLink';
import SendProposalButton from './SendProposalButton';

type Props = {
  icon: React.ReactNode;
  position: 'left' | 'right';
  iconVariant: 'soft' | 'surface';
};

function SidebarButton({ icon, iconVariant, position }: Props) {
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
      <IconButton
        variant={iconVariant}
        size={'3'}
        onClick={() => setVisible(!visible)}
      >
        {icon}
      </IconButton>

      <div
        className={`flex flex-col justify-between p-6 gap-3 fixed bottom-0 ${menuPosition} ${menuSlideAnimation} h-full bg-gray-2 border border-gray-4 w-[15rem] duration-300 z-20`}
      >
        <div className="flex justify-end">
          <IconButton variant="ghost" onClick={() => setVisible(false)}>
            <Cross1Icon />
          </IconButton>
        </div>
        <div
          onClick={() => setVisible(false)}
          className="h-full flex flex-col items-center"
        >
          <div
            className={`flex flex-col h-1/3 mt-[5rem] text-center justify-between items-center w-full`}
          >
            {links.map((link, i) => (
              <NavLink link={link} key={i} onClick={() => setVisible(false)} />
            ))}
          </div>
        </div>
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
