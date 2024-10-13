import OAuthSignInButton from '@/components/OAuthSignInButton';
import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import SignOutButton from '@/components/SignOutButton';
import {
  SignedIn,
  SignedOut,
  SignInButton as ClerkSignInButton,
  SignUpButton as ClerkSignUpButton,
  UserButton,
} from '@clerk/nextjs';
import { Button, Separator } from '@radix-ui/themes';
import { Sign } from 'crypto';
import SignInButton from '@/components/SignInButton';
import SignUpButton from '@/components/SignUpButton';

type Props = {};

async function page({}: Props) {
  return (
    <div>
      <SignedOut>
        <div className="flex h-[2rem] items-center gap-3 float-right m-3">
          <ClerkSignInButton>
            <SignInButton />
          </ClerkSignInButton>
          <Separator size={'1'} orientation={'vertical'} />
          <ClerkSignUpButton>
            <SignUpButton />
          </ClerkSignUpButton>
        </div>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
export default page;
