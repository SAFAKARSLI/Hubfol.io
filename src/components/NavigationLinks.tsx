'use client';
import { links } from '@/utils';
import React from 'react';
import { useParams, usePathname } from 'next/navigation';
import NavLink from './NavLink';

interface NavigationLinksProps {
  isCol?: boolean;
  onClick?: () => void;
}

function NavigationLinks({ isCol = false, onClick }: NavigationLinksProps) {
  const url = usePathname();
  return (
    <div
      className={`flex ${
        isCol && 'flex-col '
      } h-full text-center justify-between items-center`}
    >
      {links.map((link, i) => (
        <NavLink link={link} key={i} onClick={onClick} />
      ))}
    </div>
  );
}

export default NavigationLinks;
