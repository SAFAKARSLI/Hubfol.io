'use client';
import { Button, Text } from '@radix-ui/themes';
import { signIn } from 'next-auth/react';
import React from 'react';

type Props = {
  logo: JSX.Element;
  label: string;
  OAuthType: 'google' | 'github';
};

function OAuthSignInButton({ logo, label, OAuthType }: Props) {
  const handleSignInButtonClick = async () => {
    signIn(OAuthType, { callbackUrl: '/fully-signed-in' });
  };

  return (
    <div
      className="flex gap-1 h-full justify-center items-center hover:cursor-pointer"
      onClick={handleSignInButtonClick}
    >
      {logo} <Text className="text-white">{label}</Text>
    </div>
  );
}

export default OAuthSignInButton;
