import Projects from '@/components/Projects';
import { SlugProps } from '@/types/slug';
import React from 'react';

export default function page({ params }: SlugProps) {
  const { userUUID, projectUUID } = params;
  return <Projects userUUID={userUUID} activeProjectId={projectUUID} />;
}
