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
  const { username } = useParams();

  return (
    <form action={initiateProject}>
      <input type="hidden" name="username" value={username} />
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
