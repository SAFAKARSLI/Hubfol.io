'use client';

import { ArrowLeftIcon, HomeIcon } from '@radix-ui/react-icons';
import { useSession } from 'next-auth/react';
import { TiHome } from 'react-icons/ti';

import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { Button, IconButton, Link } from '@radix-ui/themes';

type Props = {
  children: React.ReactNode;
  backButtonUrl: string;
};

function FormWrapper({ children, backButtonUrl }: Props) {
  const router = useRouter();
  const { userUUID } = useParams();
  return (
    <div className="p-5 -md:p-3 flex flex-col gap-5">
      <Link
        href="/u/${userUUID}/projects"
        className="cursor-pointer hover:underline text-xs flex gap-1"
      >
        <TiHome className="w-4 h-4" /> Home Page
      </Link>
      <div className="m-auto max-w-[900px]">{children}</div>
    </div>
  );
}

export default FormWrapper;
