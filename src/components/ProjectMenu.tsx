import React, { useState } from 'react';

import {
  DropdownMenu,
  IconButton,
  AlertDialog,
  Flex,
  Button,
  TextField,
  Dialog,
} from '@radix-ui/themes';

import {
  TrashIcon,
  Pencil2Icon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons';

import { useParams } from 'next/navigation';

import { deleteProject } from '@/app/actions';
import DeleteProjectDialog from './DeleteProjectDialog';
import ProjectDialog from './ProjectDialog';
import Project from '@/types/project';
import EditProjectDialog from './EditProjectDialog';
import { cloneDeep } from 'lodash';

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
          <IconButton variant="ghost" color="gray" size={'1'} className="mt-1">
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

      <Dialog.Root
        open={editDialogeOpen}
        onOpenChange={() => {
          setProject(cloneDeep(initialProject));
        }}
      >
        <EditProjectDialog
          project={project}
          setProject={setProject}
          setEditDialogeOpen={setEditDialogeOpen}
        />
      </Dialog.Root>
    </div>
  );
}

export default ProjectMenu;
