'use client';
import React from 'react';
import { Button } from '@radix-ui/themes';
import { buttonVariants } from '@/utils';
import { PlusIcon } from '@radix-ui/react-icons';
import { useParams, useRouter } from 'next/navigation';
import { v4 as v4uuid } from 'uuid';
import { initiateProject } from '@/app/actions/project';
import SubmitButton from './SubmitButton';

type Props = {
  variant?: buttonVariants;
};

function AddProjectButton({ variant = 'soft' }: Props) {
  const { userUUID } = useParams();
  const router = useRouter();

  async function handleAddButtonClick() {
    // router.push(
    //   `/u/${userUUID}/projects/${
    //     initiatedProject.data!.uuid
    //   }/general-information?initialize=true`
    // );
  }

  return (
    <form action={initiateProject}>
      <input type="hidden" name="userUUID" value={userUUID} />
      <SubmitButton
        variant={variant}
        style="cursor-pointer rounded h-12 w-full mb-3"
      >
        <PlusIcon /> Add Project
      </SubmitButton>
    </form>
  );
}

export default AddProjectButton;
