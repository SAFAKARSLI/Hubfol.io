import React from 'react';

import Projects from '@/components/pages/Projects';
import { SlugProps } from '@/types/slug';

export default async function page({ params }: SlugProps) {
  const { userUUID } = params;
  return <Projects userUUID={userUUID} />;
}
