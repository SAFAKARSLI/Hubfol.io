'use client';
import { errorCodes } from '@/utils';
import { Cross2Icon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import { useParams, usePathname, useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  code: string;
};

function ErrorPopup({ code }: Props) {
  const router = useRouter();
  const { userUUID } = useParams();

  return (
    <div className="absolute top-0 right-0 m-4 bg-red-2 p-3 rounded-md border border-red-5 ">
      <IconButton
        variant="ghost"
        color="gray"
        size={'1'}
        className="float-end cursor-pointer"
        onClick={() => router.replace(`/u/${userUUID}/projects`)}
      >
        <Cross2Icon />
      </IconButton>

      <h2 className="text-lg text-gray-11 ">Error!</h2>
      <p className="text-red-10 text-sm pt-1 font-bold">
        {errorCodes.find((e) => e.code === code)?.message}
      </p>
    </div>
  );
}

export default ErrorPopup;
