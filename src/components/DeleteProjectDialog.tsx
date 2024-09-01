import React, { useState } from 'react';

import {
  DropdownMenu,
  IconButton,
  AlertDialog,
  Flex,
  Button,
  TextField,
} from '@radix-ui/themes';

import {
  TrashIcon,
  Pencil2Icon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons';

import { useParams } from 'next/navigation';

import { deleteProject } from '@/app/actions';

type Props = {
  projectUUID: string;
  title: string;
};

function DeleteProjectDialog({ projectUUID, title }: Props) {
  const { userUUID } = useParams<{ userUUID: string }>();
  const [deleteDialogeOpen, setDeleteDialogeOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState('');

  return (
    <div className="h-full flex-none">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton variant="ghost" color="gray" asChild>
            <DotsHorizontalIcon />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item onSelect={() => console.log('Edit')}>
            <Pencil2Icon />
            Edit
          </DropdownMenu.Item>
          <DropdownMenu.Item
            color="red"
            onSelect={() => setDeleteDialogeOpen(true)}
          >
            <TrashIcon />
            Delete
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <AlertDialog.Root
        onOpenChange={() => {
          setDeleteDialogeOpen(false);
          setConfirmDelete('');
        }}
        open={deleteDialogeOpen}
      >
        <AlertDialog.Content maxWidth="500px">
          <AlertDialog.Title size={'6'}>Delete `{title}`</AlertDialog.Title>
          <AlertDialog.Description size="3">
            Are you sure you want to delete the <b>`{title}`</b>? This action is
            permanent and cannot be undone. <br /> <br />
            To confirm deletion, type{' '}
            <b>
              <i>{title}</i>
            </b>{' '}
            in the input below.
          </AlertDialog.Description>
          <TextField.Root
            value={confirmDelete}
            onChange={(e) => setConfirmDelete(e.target.value)}
            placeholder={title}
            size={'3'}
            className="w-full text-m my-3"
          />
          <Flex gap="3" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                color="red"
                disabled={title != confirmDelete}
                onClick={() => {
                  deleteProject(projectUUID, userUUID);
                }}
              >
                Delete project
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
}

export default DeleteProjectDialog;
