import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { baseUrl } from '@/utils';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
  children: React.ReactNode;
  userUUID: string;
};

async function AuthChecker({ children, userUUID }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`${baseUrl}/login`);
  }

  if (session.user?.uuid !== userUUID) {
    redirect(`${baseUrl}/u/${session.user?.uuid}/projects`);
  }

  return <>{children}</>;
}

export default AuthChecker;
