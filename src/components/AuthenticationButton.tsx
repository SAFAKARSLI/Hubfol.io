'use client';
import { Button, Text, AlertDialog, Flex } from '@radix-ui/themes';
import React from 'react';
import { signIn, signOut } from 'next-auth/react';
import { FaSignOutAlt } from 'react-icons/fa';

import { logIn, logOut } from '@/app/actions';

type Props = {
  label: string;
  userUUID: string;
};

function AuthenticationButton({ label, userUUID }: Props) {
  if (label.includes('Sign In')) {
    return (
      <Button
        variant="ghost"
        onClick={() =>
          signIn('google', { callbackUrl: `/users/${userUUID}/projects` })
        }
      >
        <Text className="text-white">{label}</Text>
      </Button>
    );
  } else {
    return (
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button variant="ghost">
            <FaSignOutAlt /> Sign Out
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title size={'6'}>Sign Out</AlertDialog.Title>
          <AlertDialog.Description size="4">
            Are you sure you want to sign out?
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action onClick={() => signOut()}>
              <Button variant="solid" color="red">
                Sign Out
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    );
  }
}

export default AuthenticationButton;
