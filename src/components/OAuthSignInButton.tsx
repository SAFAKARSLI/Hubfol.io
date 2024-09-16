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
    <Button
      className="w-full"
      variant="ghost"
      onClick={handleSignInButtonClick}
    >
      <div className="flex gap-1 h-full justify-center items-center">
        {logo} <Text className="text-white">{label}</Text>
      </div>
    </Button>
  );
}

export default OAuthSignInButton;
