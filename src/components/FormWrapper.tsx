'use client';

import { TiHome } from 'react-icons/ti';
import React from 'react';
import { Link } from '@radix-ui/themes';

type Props = {
  children: React.ReactNode;
  backButtonUrl?: string;
};

function FormWrapper({ children, backButtonUrl }: Props) {
  return (
    <div className="p-5 -md:p-3 flex flex-col gap-5">
      {backButtonUrl && (
        <Link
          href={backButtonUrl}
          className="cursor-pointer hover:underline text-xs flex gap-1"
        >
          <TiHome className="w-4 h-4" /> Home Page
        </Link>
      )}
      <div className="m-auto max-w-[900px] min-w-0 w-full">{children}</div>
    </div>
  );
}

export default FormWrapper;
