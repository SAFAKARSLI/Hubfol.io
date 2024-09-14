import React, { useEffect, useState } from 'react';
import { AlertDialog, TextField, Flex, Button } from '@radix-ui/themes';
import { deleteProject } from '@/app/actions/project';

type Props = {
  title: string;
  projectUUID: string;
  userUUID: string;
};

function DeleteProjectDialog({ title, projectUUID, userUUID }: Props) {
  const [confirmDelete, setConfirmDelete] = useState('');

  useEffect(() => {
    return () => {
      setConfirmDelete('');
    };
  }, []);

  return (
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
  );
}

export default DeleteProjectDialog;
