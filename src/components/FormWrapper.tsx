'use client';

import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  children: React.ReactNode;
  backButtonUrl: string;
};

function FormWrapper({ children, backButtonUrl }: Props) {
  const router = useRouter();
  return (
    <div>
      <div className="float-left m-10">
        <IconButton
          className="rounded-full cursor-pointer"
          variant="ghost"
          size={'3'}
          onClick={() => router.push(backButtonUrl)}
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </IconButton>
      </div>
      <div className="m-auto max-w-[900px] p-8 -md:px-3">{children}</div>
    </div>
  );
}

export default FormWrapper;
