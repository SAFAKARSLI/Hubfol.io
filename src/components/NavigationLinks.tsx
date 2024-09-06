import { links } from '@/utils';
import { Text } from '@radix-ui/themes';
import React from 'react';
import Link from 'next/link';
import { SlugProps } from '@/types/slug';

interface NavigationLinksProps {
  userUUID: string;
  isCol?: boolean;
  onClick?: () => void;
}

function NavigationLinks({
  userUUID,
  isCol = false,
  onClick,
}: NavigationLinksProps) {
  return (
    <div
      className={`flex ${
        isCol && 'flex-col justify-center'
      } items-center h-full justify-between text-center w-full flex-1`}
    >
      {links.map((link, i) => (
        <Link
          href={`/users/${userUUID}/${link.toLowerCase().replaceAll(' ', '-')}`}
          color="gray"
          key={i}
          className="hover:text-white text-gray-400 header-link items-center justify-center h-full flex -2xl:text-xs flex-1  w-full"
          onClick={onClick}
        >
          {link}
        </Link>
      ))}
    </div>
  );
}

export default NavigationLinks;
