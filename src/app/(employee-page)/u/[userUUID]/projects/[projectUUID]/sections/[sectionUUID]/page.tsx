'use client';
import { employeeSectionsRedirect } from '@/app/actions/user';
import FormWrapper from '@/components/FormWrapper';
import FormSection from '@/components/project-form/form-sections/FormSection';
import SectionForm from '@/components/project-form/form-sections/project-sections/SectionForm';
import { SlugProps } from '@/types/slug';
import React from 'react';

type Props = {};

function page({ params }: SlugProps) {
  return (
    <FormWrapper
      backButtonAction={() =>
        employeeSectionsRedirect(params.userUUID, params.projectUUID)
      }
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
