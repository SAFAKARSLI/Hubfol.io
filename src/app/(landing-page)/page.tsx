import React from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

import AuthenticationButtonsWrapper from '@/components/AuthenticationButtonsWrapper';
import { Button, Link } from '@radix-ui/themes';
import { currentUser } from '@clerk/nextjs/server';

type Props = {};

async function page({}: Props) {
  const user = await currentUser();

  return (
    <div>
      <SignedOut>
        <div className="flex h-[2rem] items-center gap-3 float-right m-3">
          <AuthenticationButtonsWrapper />
        </div>
      </SignedOut>
      <SignedIn>
        <Link href={`/u/${user!.username}/projects`}>
          <Button>My Profile</Button>
        </Link>
      </SignedIn>
    </div>
  );
}
export default page;
