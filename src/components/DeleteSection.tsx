'use client';

import { deleteSection } from '@/app/actions/section';
import { usePreloadedFormData } from '@/hooks';
import { Section } from '@/types/section';
import { baseUrl } from '@/utils';
import { Submit } from '@radix-ui/react-form';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import SubmitButton from './SubmitButton';

type Props = {
  section: Section;
};

function DeleteSection({ section }: Props) {
  const { userUUID, projectUUID } = useParams();

  const [formAction, editFormData] = usePreloadedFormData(
    deleteSection,
    `${baseUrl}/u/${userUUID}/projects/${projectUUID}/sections`
  );

  return (
    <form action={formAction}>
      <input type="hidden" name="uuid" value={section.uuid} />
      <SubmitButton color="red">Delete</SubmitButton>
    </form>
  );
}

export default DeleteSection;
