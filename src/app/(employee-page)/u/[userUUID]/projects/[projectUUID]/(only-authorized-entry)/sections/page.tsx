import Projects from '@/components/pages/Projects';
import ProjectForm from '@/components/project-form/ProjectForm';
import ProjectFrame from '@/components/ProjectFrame';
import { SlugProps } from '@/types/slug';
import { Spinner } from '@radix-ui/themes';
import React, { Suspense } from 'react';

export default async function page({ params }: SlugProps) {
  return <ProjectForm activeStepIndex={1} key={1} />;
}
