'use client';

import SubmitButton from '@/components/SubmitButton';
import { baseUrl } from '@/utils';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FaHome } from 'react-icons/fa';

// Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { userUUID } = useParams();

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="text-center flex flex-col justify-center items-center">
        <h2 className="text-xl">Something went wrong!</h2>
        <p className="text-red-10 text-lg text-center">{error.message}</p>
        <Link
          href={`${baseUrl}/u/${userUUID}/projects`}
          className="text-violet-11 hover:underline text-lg flex justify-center items-center pt-4"
        >
          <FaHome className="inline mr-2" /> Go to Home Page
        </Link>
      </div>
    </div>
  );
}
