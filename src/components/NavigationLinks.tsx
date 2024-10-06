'use client';
import { links } from '@/utils';
import React from 'react';
import { useParams, usePathname } from 'next/navigation';
import NavLink from './NavLink';
import Link from 'next/link';

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
      } h-[3rem] flex-wrap text-center items-center gap-8`}
    >
      {links.map((link, i) => (
        <NavLink link={link} key={i} onClick={onClick} />
      ))}
      <Link href={`/`}>Templates</Link>
    </div>
  );
}

export default NavigationLinks;
