import Projects from '@/components/pages/Projects';
import { SlugProps } from '@/types/slug';
import React from 'react';

function page({ params }: SlugProps) {
  const { userUUID } = params;
  return <div>ProjectOverview</div>;
}

export default page;
