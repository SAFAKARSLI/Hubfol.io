'use client';

import SubmitButton from '@/components/SubmitButton';
import { baseUrl } from '@/utils';
import Link from 'next/link';
import { useParams } from 'next/navigation';

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
    <div className="flex justify-center items-center w-full h-full">
      <div className="text-center">
        <h2 className="text-xl">Something went wrong!</h2>
        <p className="text-red-10 text-lg text-center">{error.message}</p>
        <Link href={`${baseUrl}/u/${userUUID}/projects`}>Go Home</Link>
      </div>
    </div>
  );
}
