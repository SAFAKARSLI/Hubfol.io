import React from 'react';
import { Box, Dialog, Button } from '@radix-ui/themes';

import { buttonVariants } from '@/utils';

import { PlusIcon } from '@radix-ui/react-icons';
import ProjectDialog from './dialogs/ProjectDialog';
import { createProject } from '@/app/actions';

type Props = {
  userUUID: string;
  onSubmit?: () => void;
  variant?: buttonVariants;
};

function AddProjectButton({ userUUID, onSubmit, variant = 'soft' }: Props) {
  return (
    <Box>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button
            variant={variant}
            className="cursor-pointer rounded h-12 w-full mb-3"
          >
            <PlusIcon /> Add Project
          </Button>
        </Dialog.Trigger>
        <ProjectDialog
          title="Create a New Project"
          actionButtonLabel="Create Project"
          formAction={createProject}
          initialValues={{}}
        />
      </Dialog.Root>
    </Box>
  );
}

export default AddProjectButton;
