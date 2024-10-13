'use client';
import { activeLink, highlightedLinks, links } from '@/utils';
import React from 'react';
import { useParams, usePathname } from 'next/navigation';
import NavLink from './NavLink';
import Link from 'next/link';
import { Separator } from '@radix-ui/themes';

interface NavigationLinksProps {
  isCol?: boolean;
  onClick?: () => void;
  authenticated: boolean;
}

function NavigationLinks({ onClick, authenticated }: NavigationLinksProps) {
  const { username } = useParams();

  const url = usePathname();
  const active = activeLink(url);

  return (
    <div
      className={`flex h-[3rem] flex-wrap text-center items-center justify-center w-[27rem] gap-10 `}
    >
      {links.map((link, i) => (
        <NavLink
          link={link}
          key={i}
          active={active == link.url}
          onClick={onClick}
        />
      ))}
      {authenticated && (
        <>
          <Separator orientation="vertical" size="1" />
          {highlightedLinks.map(({ title, url }, index) => (
            <Link
              href={`/u/${username}/${url}`}
              key={index}
              className={`header-link header-highlighted-link ${
                active == url && 'header-link-active'
              }`}
            >
              {title}
            </Link>
          ))}
        </>
      )}
    </div>
  );
}

export default NavigationLinks;
