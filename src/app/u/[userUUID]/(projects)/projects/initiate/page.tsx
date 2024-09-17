import { initiateProject } from '@/app/actions/project';
import ProjectForm from '@/components/project-form/ProjectForm';
import Project from '@/types/project';
import { SlugProps } from '@/types/slug';
import { cookies } from 'next/headers';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export default async function page({ params }: SlugProps) {
  const { userUUID } = params;

  const project = (await initiateProject(userUUID as string)) as Project;

  return <ProjectForm project={project} />;
}
