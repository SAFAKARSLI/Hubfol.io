import ProjectForm from '@/components/project-form/ProjectForm';
import { SlugProps } from '@/types/slug';
import React from 'react';

type Props = {};

function page({}: Props) {
  return <ProjectForm activeStepIndex={0} key={0} />;
}

export default page;
