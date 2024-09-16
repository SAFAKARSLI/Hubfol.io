import { baseUrl } from '@/utils';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

type Props = {};

async function page({}: Props) {
  const session = await getServerSession(authOptions);
  const userUUID = session?.user?.uuid;

  redirect(`${baseUrl}/u/${userUUID}/projects`);
}

export default page;
