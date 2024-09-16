'use client';
import { Button, Text } from '@radix-ui/themes';
import { signIn } from 'next-auth/react';
import React from 'react';

type Props = {
  logo: JSX.Element;
  label: string;
  OAuthType: 'google' | 'github';
  userUUID?: string;
};

function OAuthSignInButton({ logo, label, OAuthType, userUUID }: Props) {
  return (
    <Button
      className="w-full"
      variant="ghost"
      onClick={() =>
        signIn(OAuthType, {
          callbackUrl: `/u/${userUUID}/projects`,
        })
      }
    >
      <div className="flex gap-1 h-full justify-center items-center">
        {logo} <Text className="text-white">{label}</Text>
      </div>
    </Button>
  );
}

export default OAuthSignInButton;
