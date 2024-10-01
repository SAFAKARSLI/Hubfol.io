'use client';

import { ArrowLeftIcon, HomeIcon } from '@radix-ui/react-icons';
import { useSession } from 'next-auth/react';
import { TiHome } from 'react-icons/ti';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { IconButton } from '@radix-ui/themes';

type Props = {
  children: React.ReactNode;
  backButtonUrl: string;
};

function FormWrapper({ children, backButtonUrl }: Props) {
  const router = useRouter();
  const { userUUID } = useParams();
  return (
    <div className="-md:mx-3 wf-">
      <div className="md:m-10  -md:mt-6 ">
        <IconButton
          onClick={() => router.push(`/u/${userUUID}/projects`)}
          variant="ghost"
          size={'3'}
          className="rounded-full cursor-pointer hover:underline text-xs"
        >
          <>
            <TiHome className="w-5 h-5" />
          </>
        </IconButton>
      </div>
      <div className="m-auto max-w-[900px] px-6">{children}</div>
    </div>
  );
}

export default FormWrapper;
