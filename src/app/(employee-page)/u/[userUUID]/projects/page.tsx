import React from 'react';

import Projects from '@/components/pages/Projects';
import { SlugProps } from '@/types/slug';
import NoActiveProjectBanner from '@/components/NoActiveProjectBanner';

export default async function page({ params, searchParams }: SlugProps) {
  const { userUUID } = params;

  return (
    <Projects userUUID={userUUID}>
      <NoActiveProjectBanner error={searchParams!.error} />
    </Projects>
  );
}
