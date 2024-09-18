import SectionForm from '@/components/project-form/form-sections/project-sections/SectionForm';
import { SlugProps } from '@/types/slug';
import React from 'react';

type Props = {};

function page({ params }: SlugProps) {
  const { sectionUUID, projectUUID, userUUID } = params;

  return <SectionForm />;
}

export default page;
