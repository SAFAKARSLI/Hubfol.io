'use client';
import { Button, Text } from '@radix-ui/themes';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  logo: JSX.Element;
  label: string;
  OAuthType: 'google' | 'github';
  variant: 'solid' | 'ghost' | 'outline' | 'surface';
  color: 'violet' | 'red' | 'gray';
};

function OAuthSignInButton({ logo, label, OAuthType, variant, color }: Props) {
  const router = useRouter();

  const handleSignInButtonClick = async () => {
    const response = await signIn(OAuthType, {
      callbackUrl: '/fully-signed-in',
    });
  };

  return (
    <Button
      variant={variant}
      color={color}
      className="flex gap-1 h-[2.5rem] justify-center items-center hover:cursor-pointer w-full"
      onClick={handleSignInButtonClick}
    >
      {logo} <Text className="text-white">{label}</Text>
    </Button>
  );
}

export default OAuthSignInButton;
