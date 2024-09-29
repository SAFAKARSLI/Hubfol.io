'use client';
import FormWrapper from '@/components/FormWrapper';
import FormSection from '@/components/project-form/form-sections/FormSection';
import SectionForm from '@/components/project-form/form-sections/project-sections/SectionForm';
import { SlugProps } from '@/types/slug';
import React from 'react';

type Props = {};

function page({ params }: SlugProps) {
  return (
    <FormWrapper
      backButtonUrl={`/u/${params.userUUID}/projects/${params.projectUUID}/sections`}
    >
      <FormSection
        title="Edit Section"
        description="Edit the section information below. You can change this information later."
      >
        <SectionForm />
      </FormSection>
    </FormWrapper>
  );
}

export default page;
