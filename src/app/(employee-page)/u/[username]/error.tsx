'use client';

import { baseUrl } from '@/utils';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

// Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { user } = useUser();

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="text-center flex flex-col justify-center items-center">
        <h2 className="text-xl">Something went wrong!</h2>
        <p className="text-red-10 text-lg text-center">{error.message}</p>
        <Link
          href={`${baseUrl}/u/${user?.username}/projects`}
          className="text-violet-11 hover:underline text-lg flex justify-center items-center pt-4"
        >
          <FaHome className="inline mr-2" /> Go to Home Page
        </Link>
      </div>
    </div>
  );
}
