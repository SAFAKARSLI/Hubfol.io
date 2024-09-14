import SectionForm from '@/components/project-form/form-sections/project-sections/SectionForm';
import { SlugProps } from '@/types/slug';
import { defaultSections } from '@/utils';
import React from 'react';

type Props = {};

function page({ params }: SlugProps) {
  const { sectionUUID, projectUUID, userUUID } = params;

  return <div>Section Panel that views the Section</div>;
}

export default page;
