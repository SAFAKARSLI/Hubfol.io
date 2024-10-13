import { EnterIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React from 'react';

type Props = {};

function SignInButton({}: Props) {
  return (
    <div className="text-sm text-violet-11 flex gap-2 items-center hover:cursor-pointer">
      <EnterIcon />
      Log in
    </div>
  );
}

export default SignInButton;
