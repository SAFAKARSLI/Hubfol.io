import React from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

import AuthenticationButtonsWrapper from '@/components/AuthenticationButtonsWrapper';

type Props = {};

async function page({}: Props) {
  return (
    <div>
      <SignedOut>
        <div className="flex h-[2rem] items-center gap-3 float-right m-3">
          <AuthenticationButtonsWrapper />
        </div>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
export default page;
