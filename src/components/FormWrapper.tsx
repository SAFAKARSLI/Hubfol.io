'use client';

import { TiHome } from 'react-icons/ti';
import React from 'react';
import { Button, Link } from '@radix-ui/themes';
import { baseUrl } from '@/utils';
import { useUser } from '@clerk/nextjs';

type Props = {
  children: React.ReactNode;
  backButtonUrl?: string;
  disabled?: boolean;
};

function FormWrapper({ children, backButtonUrl, disabled = false }: Props) {
  const { user } = useUser();

  const url = backButtonUrl ?? `${baseUrl}/u/${user?.username}/projects`;
  return (
    <div className="p-5 -md:p-3  ">
      {!disabled && (
        <Link
          href={url}
          className="cursor-pointer hover:underline text-xs flex gap-1 mb-5"
        >
          <TiHome className="w-4 h-4" /> Home Page
        </Link>
      )}
      <div className="m-auto max-w-[900px] min-w-0 w-full">{children}</div>
    </div>
  );
}

export default FormWrapper;
