import ProjectForm from '@/components/project-form/ProjectForm';
import { SlugProps } from '@/types/slug';
import React from 'react';

export default function page({ params }: SlugProps) {
  const { userUUID } = params;
  return <ProjectForm userUUID={userUUID} />;
}
