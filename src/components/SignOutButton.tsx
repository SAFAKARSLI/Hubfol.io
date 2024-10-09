'use client';
import { Button, Text, AlertDialog, Flex } from '@radix-ui/themes';
import React, { useState } from 'react';
import { signIn, signOut } from 'next-auth/react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useParams } from 'next/navigation';
import { ExitIcon } from '@radix-ui/react-icons';
import SidebarMenuLink from './SidebarMenuLink';

type Props = {};

function SignOutButton({}: Props) {
  const [open, setOpen] = useState(false);
  return (
    <AlertDialog.Root open={open}>
      <AlertDialog.Trigger onMouseDown={() => setOpen(true)}>
        <div className="flex gap-1 items-center p-1 hover:bg-gray-4 rounded-md text-sm hover:cursor-pointer text-red-400">
          <ExitIcon className="h-4 w-4" color="tomato" /> Sign Out
        </div>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px" style={{ zIndex: 1 }}>
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
          <AlertDialog.Action
            onClick={() => signOut({ callbackUrl: `/login` })}
          >
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
