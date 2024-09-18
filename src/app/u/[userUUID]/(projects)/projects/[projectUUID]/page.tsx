import Projects from '@/components/pages/Projects';
import ProjectFrame from '@/components/ProjectFrame';
import { SlugProps } from '@/types/slug';
import { Spinner } from '@radix-ui/themes';
import React, { Suspense } from 'react';

export default async function page({ params }: SlugProps) {
  const { userUUID, projectUUID } = params;

  return (
    <Projects userUUID={userUUID} activeProjectId={projectUUID}>
      <ProjectFrame />
    </Projects>
  );
}
