'use client';
import React, { useState } from 'react';

import {
  DropdownMenu,
  IconButton,
  AlertDialog,
  Dialog,
} from '@radix-ui/themes';

import * as DialogPrimitive from '@radix-ui/react-dialog';

import {
  TrashIcon,
  Pencil2Icon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons';

import { useParams } from 'next/navigation';

import DeleteProjectDialog from './dialogs/DeleteProjectDialog';

type Props = {
  projectUUID: string;
  title: string;
  // initialProject: Project;
};

function ProjectMenu({ projectUUID, title }: Props) {
  const { userUUID } = useParams<{ userUUID: string }>();

  const [deleteDialogeOpen, setDeleteDialogeOpen] = useState(false);

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton
            variant="ghost"
            color="gray"
            className="mt-1 h-4 w-4 -md:h-6 -md:w-6"
          >
            <DotsHorizontalIcon />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item
            onMouseDown={() => {
              // setEditDialogeOpen(true);
            }}
          >
            <Pencil2Icon />
            Edit
          </DropdownMenu.Item>
          <DropdownMenu.Separator />

          <DropdownMenu.Item
            color="red"
            onMouseDown={() => setDeleteDialogeOpen(true)}
          >
            <TrashIcon />
            Delete
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <AlertDialog.Root
        open={deleteDialogeOpen}
        onOpenChange={() => {
          if (deleteDialogeOpen) {
            setDeleteDialogeOpen(false);
          }
        }}
      >
        <DeleteProjectDialog
          title={title}
          projectUUID={projectUUID}
          userUUID={userUUID}
        />
      </AlertDialog.Root>
    </>
  );
}

export default ProjectMenu;
