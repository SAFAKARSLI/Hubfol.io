'use client';

import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import React from 'react';

type Props = {
  children: React.ReactNode;
  backButtonAction: () => Promise<never>;
};

function FormWrapper({ children, backButtonAction }: Props) {
  return (
    <div>
      <div className="float-left m-10">
        <IconButton
          className="rounded-full cursor-pointer"
          variant="ghost"
          size={'3'}
          onClick={backButtonAction}
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </IconButton>
      </div>
      <div className="m-auto max-w-[900px] p-8 -md:px-3">{children}</div>
    </div>
  );
}

export default FormWrapper;
