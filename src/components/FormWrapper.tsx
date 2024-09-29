'use client';

import { ArrowLeftIcon, HomeIcon } from '@radix-ui/react-icons';
import { Button, IconButton, Link } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  children: React.ReactNode;
  backButtonUrl: string;
};

function FormWrapper({ children, backButtonUrl }: Props) {
  const router = useRouter();
  return (
    <div className="-md:mx-3 wf-">
      <div className="md:m-10  -md:mt-6 ">
        <Link
          className="rounded-full cursor-pointer flex gap-1 hover:underline text-xs justiy-center items-center"
          size={'3'}
          onClick={() => router.push(backButtonUrl)}
        >
          <>
            <ArrowLeftIcon className="w-4 h-4" /> Cancel
          </>
        </Link>
      </div>
      <div className="m-auto max-w-[900px] px-6">{children}</div>
    </div>
  );
}

export default FormWrapper;
