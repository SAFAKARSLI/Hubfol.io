'use client';
import React from 'react';
import ProjectInfoForm from './form-sections/project-info/ProjectInfoForm';
import SectionsTable from './form-sections/project-sections/SectionsTable';
import { upsertGeneralInfo } from '@/app/actions/project';
import Stepper from '../custom-comps/stepper/Stepper';
import FrameOptionsForm from './form-sections/frame-options/FrameOptionsForm';
import { useParams, useSearchParams } from 'next/navigation';
import { baseUrl } from '@/utils';

type Props = {
  activeStepIndex: number;
};

function ProjectForm({ activeStepIndex }: Props) {
  // Will allow me to set the initialize query param such that in the intial form, we get around with the initial fethcing of the data.
  const searchParams = useSearchParams();
  const { userUUID, projectUUID } = useParams();
  return (
    <Stepper
      activeStepIndex={activeStepIndex}
      steps={[
        {
          title: 'General Information',
          description:
            'Enter the project information below. You can edit this information later.',
          content: <ProjectInfoForm editFormData={null} />,
          onComplete: upsertGeneralInfo,
          fetchResource: '',
          callback: `${baseUrl}/u/${userUUID}/projects/${projectUUID}/sections?${searchParams.toString()}`,
          slug: 'general-information',
          index: 0,
        },
        {
          title: 'Sections',
          description:
            'Sections are different ways by which you can flex your project. This information is visible when the project is active.',
          content: <SectionsTable />,
          onComplete: () => console.log('skip'),
          fetchResource: '',
          callback: `${baseUrl}/u/${userUUID}/projects/${projectUUID}/frame-options?${searchParams.toString()}`,
          slug: 'sections',
          index: 1,
        },
        {
          title: 'Frame Options',
          description: 'Choose your frame options.',
          content: <FrameOptionsForm />,
          onComplete: () => console.log('Skipped General Information'),
          fetchResource: '',
          callback: `${baseUrl}/u/${userUUID}/projects/${projectUUID}/review?${searchParams.toString()}`,
          slug: 'frame-options',
          index: 2,
        },
        {
          title: 'Review',
          description: 'Review your project details before submission.',
          content: <div>Review your project details here.</div>,
          onComplete: () => console.log('Skipped General Information'),
          fetchResource: '',
          callback: `${baseUrl}/u/${userUUID}/projects`,
          slug: 'review',
          index: 3,
        },
      ]}
    />
  );
}

export default ProjectForm;
