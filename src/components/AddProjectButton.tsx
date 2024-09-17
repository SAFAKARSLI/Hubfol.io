'use client';
import React from 'react';
import { Button } from '@radix-ui/themes';
import { buttonVariants } from '@/utils';
import { PlusIcon } from '@radix-ui/react-icons';
import { redirect, useParams, useRouter } from 'next/navigation';
import { initiateProject } from '@/app/actions/project';

type Props = {
  variant?: buttonVariants;
};

function AddProjectButton({ variant = 'soft' }: Props) {
  const { userUUID } = useParams();
  const router = useRouter();

  async function handleAddButtonClick() {
    router.push(`/u/${userUUID}/projects/initiate`);
    // await initiateProject(userUUID as string);
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
