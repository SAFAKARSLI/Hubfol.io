'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

type Props = {};

function page({}: Props) {
  const { userUUID, projectUUID } = useParams();
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href={`/u/${userUUID}/projects`}>Return to Projects</Link>
    </div>
  );
}

export default page;
