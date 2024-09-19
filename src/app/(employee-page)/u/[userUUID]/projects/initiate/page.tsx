import ProjectForm from '@/components/project-form/ProjectForm';
import { SlugProps } from '@/types/slug';
import React from 'react';

export default async function page({ params, searchParams }: SlugProps) {
  const activeStepIndex = searchParams?.step!;
  return <ProjectForm activeStepIndex={activeStepIndex} />;
}
