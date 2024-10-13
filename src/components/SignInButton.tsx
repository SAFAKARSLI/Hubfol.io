import { EnterIcon } from '@radix-ui/react-icons';
import { SignInButton as ClerkSignInButton } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';

type Props = {};

function SignInButton({}: Props) {
  return (
    <ClerkSignInButton>
      <div className="text-sm text-violet-11 flex gap-2 items-center hover:cursor-pointer">
        <EnterIcon />
        Log in
      </div>
    </ClerkSignInButton>
  );
}

export default SignInButton;
