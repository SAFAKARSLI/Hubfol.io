import { RocketIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React from 'react';
import { SignUpButton as ClerkSignUpButton } from '@clerk/nextjs';

type Props = {};

function SignUpButton({}: Props) {
  return (
    <ClerkSignUpButton>
      <div className="border border-gray-4 p-1 px-2 bg-violet-7 rounded-md hover:bg-violet-8 text-sm flex h-full hover:cursor-pointer">
        <p>Create Account</p>
      </div>
    </ClerkSignUpButton>
  );
}

export default SignUpButton;
