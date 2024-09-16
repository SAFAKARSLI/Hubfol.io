import OAuthSignInButton from '@/components/OAuthSignInButton';
import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { authOptions } from './api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import SignOutButton from '@/components/SignOutButton';

type Props = {};

async function page({}: Props) {
  const session = await getServerSession(authOptions);
  return (
    <div>
      {session?.user ? (
        <div>
          <p>Welcome back, {session?.user.name}!</p>
          <SignOutButton userUUID={session.user.uuid} />
        </div>
      ) : (
        <OAuthSignInButton
          OAuthType="google"
          label="Sign in with Google"
          logo={<FaGoogle />}
        />
      )}
    </div>
  );
}
export default page;
