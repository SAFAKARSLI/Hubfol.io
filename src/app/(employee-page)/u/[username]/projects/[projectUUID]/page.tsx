import NoActiveProjectBanner from '@/components/NoActiveProjectBanner';
import Projects from '@/components/pages/Projects';
import ProjectFrame from '@/components/ProjectFrame';
import Project from '@/types/project';
import { SlugProps } from '@/types/slug';
import { baseUrl } from '@/utils';
import React from 'react';

type Props = {};

export default function page({ params }: SlugProps) {
  const { userUUID, projectUUID } = params;

  return (
    <Projects userUUID={userUUID} activeProjectId={projectUUID}>
      <ProjectFrame />
    </Projects>
  );
}
