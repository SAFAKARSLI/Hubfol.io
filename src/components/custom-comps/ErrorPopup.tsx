import { Cross2Icon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import React from 'react';

type Props = {
  message: string;
};

function ErrorPopup({ message }: Props) {
  return (
    <div className="absolute top-0 right-0 m-4 bg-red-2 p-3 rounded-md border border-red-5 ">
      <IconButton
        variant="ghost"
        color="gray"
        size={'1'}
        className="float-end cursor-pointer"
      >
        <Cross2Icon />
      </IconButton>

      <h2 className="text-xs">Something went wrong!</h2>
      <p className="text-red-10 text-sm">{message}</p>
    </div>
  );
}

export default ErrorPopup;
