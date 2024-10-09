import { RocketIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React from 'react';

type Props = {};

function SignUpButton({}: Props) {
  return (
    <Link
      href={'/signup'}
      type="button"
      className="border border-gray-4 p-1 px-2 bg-violet-7 rounded-md hover:bg-violet-8 text-sm"
    >
      Create Account
    </Link>
  );
}

export default SignUpButton;
