import { EnterIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React from 'react';

type Props = {};

function SignInButton({}: Props) {
  return (
    <Link
      href={'/login'}
      className="text-sm text-violet-11 flex gap-2 items-center"
    >
      <EnterIcon />
      Log in
    </Link>
  );
}

export default SignInButton;
