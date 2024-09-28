'use client';
import React from 'react';
import { Button } from '@radix-ui/themes';
import { buttonVariants } from '@/utils';
import { PlusIcon } from '@radix-ui/react-icons';
import { useParams, useRouter } from 'next/navigation';
import { v4 as v4uuid } from 'uuid';
import { initiateProject } from '@/app/actions/project';

type Props = {
  variant?: buttonVariants;
};

function AddProjectButton({ variant = 'soft' }: Props) {
  const { userUUID } = useParams();
  const router = useRouter();

  async function handleAddButtonClick() {
    const initiatedProject = await initiateProject(userUUID as string);
    router.push(
      `/u/${userUUID}/projects/${
        initiatedProject.data!.uuid
      }/general-information?initialize=true`
    );
  }

  return (
    <Button
      variant={variant}
      className="cursor-pointer rounded h-12 w-full mb-3"
      onClick={handleAddButtonClick}
    >
      <PlusIcon /> Add Project
    </Button>
  );
}

export default AddProjectButton;
