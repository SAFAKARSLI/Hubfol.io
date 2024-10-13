import AuthChecker from '@/components/auth/AuthChecker';
import ProjectForm from '@/components/project-form/ProjectForm';
import { SlugProps } from '@/types/slug';

import React from 'react';

type Props = {};

async function page({}: SlugProps) {
  return <ProjectForm activeStepIndex={0} key={0} />;
}

export default page;
