import { getProject } from '@/app/actions';
import Projects from '@/components/pages/Projects';
import ProjectFrame from '@/components/ProjectFrame';
import Project from '@/types/project';
import { SlugProps } from '@/types/slug';
import { Spinner } from '@radix-ui/themes';
import React, { Suspense } from 'react';

export default async function page({ params }: SlugProps) {
  const { userUUID, projectUUID } = params;

  return (
    <Projects userUUID={userUUID} activeProjectId={projectUUID}>
      <Suspense fallback={<Spinner />}>
        <ProjectFrame projectUUID={projectUUID} />
      </Suspense>
    </Projects>
  );
}
