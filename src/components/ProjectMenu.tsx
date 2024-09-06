'use client';
import React, { useState } from 'react';

import {
  DropdownMenu,
  IconButton,
  AlertDialog,
  Dialog,
} from '@radix-ui/themes';

import {
  TrashIcon,
  Pencil2Icon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons';

import { useParams } from 'next/navigation';

import DeleteProjectDialog from './DeleteProjectDialog';
import Project from '@/types/project';
import EditProjectDialog from './EditProjectDialog';

type Props = {
  projectUUID: string;
  title: string;
  initialProject: Project;
};

function ProjectMenu({ projectUUID, title, initialProject }: Props) {
  const { userUUID } = useParams<{ userUUID: string }>();

  const [confirmDelete, setConfirmDelete] = useState('');
  const [deleteDialogeOpen, setDeleteDialogeOpen] = useState(false);

  const [editDialogeOpen, setEditDialogeOpen] = useState(false);
  const [project, setProject] = useState(initialProject);

  return (
    <div>
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
          <DropdownMenu.Item onSelect={() => setEditDialogeOpen(true)}>
            <Pencil2Icon />
            Edit
          </DropdownMenu.Item>
          <DropdownMenu.Separator />

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
        open={deleteDialogeOpen}
        onOpenChange={() => {
          if (deleteDialogeOpen) {
            setDeleteDialogeOpen(false);
            setConfirmDelete('');
          }
        }}
      >
        <DeleteProjectDialog
          title={title}
          projectUUID={projectUUID}
          userUUID={userUUID}
          confirmDelete={confirmDelete}
          setConfirmDelete={setConfirmDelete}
        />
      </AlertDialog.Root>

      <Dialog.Root open={editDialogeOpen}>
        <EditProjectDialog
          project={project}
          setProject={setProject}
          setEditDialogeOpen={setEditDialogeOpen}
          initialProject={initialProject}
        />
      </Dialog.Root>
    </div>
  );
}

export default ProjectMenu;
