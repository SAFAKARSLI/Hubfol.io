'use client';
import { Button, Text, AlertDialog, Flex } from '@radix-ui/themes';
import React, { useState } from 'react';
import { signIn, signOut } from 'next-auth/react';
import { FaSignOutAlt } from 'react-icons/fa';

type Props = {
  userUUID: string;
};

function SignOutButton({ userUUID }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <AlertDialog.Root open={open}>
      <AlertDialog.Trigger onMouseDown={() => setOpen(true)}>
        <Button
          variant="ghost"
          className="w-full flex items-center justify-start"
        >
          <FaSignOutAlt /> Sign Out
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title size={'6'}>Sign Out</AlertDialog.Title>
        <AlertDialog.Description size="4">
          Are you sure you want to sign out?
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel onMouseDown={() => setOpen(false)}>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action onClick={() => signOut({ callbackUrl: `/` })}>
            <Button variant="solid" color="red">
              Sign Out
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}

export default SignOutButton;
