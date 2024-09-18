import { initiateProject } from '@/app/actions/project';
import ProjectForm from '@/components/project-form/ProjectForm';
import Project from '@/types/project';
import { SlugProps } from '@/types/slug';
import { cookies } from 'next/headers';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export default async function page({ params, searchParams }: SlugProps) {
  const { userUUID } = params;
  const activeStep = searchParams?.step;

  return <ProjectForm activeStep={activeStep!} />;
}
