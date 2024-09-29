import NoActiveProjectBanner from '@/components/NoActiveProjectBanner';
import Projects from '@/components/pages/Projects';
import ProjectFrame from '@/components/ProjectFrame';
import { SlugProps } from '@/types/slug';
import React from 'react';

type Props = {};

export default async function page({ params, searchParams }: SlugProps) {
  const { userUUID, projectUUID } = params;

  return (
    <Projects userUUID={userUUID} activeProjectId={projectUUID}>
      <ProjectFrame />
    </Projects>
  );
}
