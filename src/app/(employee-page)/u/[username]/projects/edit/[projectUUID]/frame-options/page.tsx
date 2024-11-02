import FormWrapper from '@/components/FormWrapper';
import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { SlugProps } from '@/types/slug';
import ProjectForm from '@/components/project-form/ProjectForm';

type Props = {};

async function page({}: SlugProps) {
  auth().protect();
  return <ProjectForm activeStepIndex={2} key={0} />;
}

export default page;
