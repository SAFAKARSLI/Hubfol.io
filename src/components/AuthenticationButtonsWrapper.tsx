import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import { Separator, Spinner } from '@radix-ui/themes';
import React from 'react';
import SignInButton from './SignInButton';
import SignUpButton from './SignUpButton';

type Props = {};

function AuthenticationButtonsWrapper({}: Props) {
  return (
    <>
      <SignInButton />
      <Separator orientation="vertical" size="1" className="mx-5" />
      <SignUpButton />
    </>
  );
}

export default AuthenticationButtonsWrapper;
