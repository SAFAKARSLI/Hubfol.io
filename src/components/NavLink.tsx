'use client';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';

type Props = {
  link: {
    title: string;
    url: string;
  };
  onClick?: () => void;
  active?: boolean;
};

function NavLink({ link, onClick, active }: Props) {
  const { userUUID } = useParams();
  return (
    <Link
      href={`/u/${userUUID}/${link.url}`}
      className={` ${active ? 'text-sm' : 'text-xs'}`}
      onClick={onClick}
    >
      <p
        className={`hover:text-white header-link ${
          active && 'header-link-active'
        }`}
      >
        {link.title}
      </p>
    </Link>
  );
}

export default NavLink;
