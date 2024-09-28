import SectionForm from '@/components/project-form/form-sections/project-sections/SectionForm';
import { SlugProps } from '@/types/slug';
import React from 'react';

type Props = {};

function page({ params }: SlugProps) {
  return <SectionForm />;
}

export default page;
