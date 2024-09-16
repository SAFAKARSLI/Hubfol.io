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
};

function NavLink({ link, onClick }: Props) {
  const { userUUID } = useParams();
  const url = usePathname();
  const color = url.includes(link.url)
    ? 'text-white header-link-active'
    : 'text-gray-400';
  return (
    <Link
      href={`/u/${userUUID}/${link.url}`}
      className={`text-center flex items-center text-sm -2xl:text-xs `}
      onClick={onClick}
    >
      <p className={` hover:text-white header-link  ${color}`}>{link.title}</p>
    </Link>
  );
}

export default NavLink;
