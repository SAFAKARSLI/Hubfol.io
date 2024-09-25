'use client';
import { handleError } from '@/app/actions/errorHandle';
import { Cross1Icon, Cross2Icon, HomeIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import Link from 'next/link';

// Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="text-center">
        <h2 className="text-xl">Something went wrong!</h2>
        <p className="text-red-10 text-lg text-center">{error.message}</p>
      </div>
    </div>
  );
}
