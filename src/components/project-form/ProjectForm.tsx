'use client';
import React from 'react';
import ProjectInfoForm from './form-sections/project-info/ProjectInfoForm';
import SectionsTable from './form-sections/project-sections/SectionsTable';
import { upsertGeneralInfo, upsertFrameOptions } from '@/app/actions/project';
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
  const { username, projectUUID } = useParams();
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
          callback: `sections?${searchParams.toString()}`,
          slug: 'general-information',
          index: 0,
        },
        {
          title: 'Sections',
          description:
            'Sections are different ways by which you can flex your project. This information is visible when the project is active. The maximum number of sections you can have is 10 per project.',
          content: <SectionsTable />,
          onComplete: () => console.log('skip'),
          fetchResource: '',
          callback: `frame-options?${searchParams.toString()}`,
          slug: 'sections',
          index: 1,
        },
        {
          title: 'Frame Options',
          description:
            'Frame options are the different ways by which you can present your projects. Unlike sections which helps users to understand what the project is about, the project frame is the project itself. Please specify below how you would like your project to be viewed.',
          content: <FrameOptionsForm />,
          onComplete: upsertFrameOptions,
          fetchResource: '',
          callback: `review?${searchParams.toString()}`,
          slug: 'frame-options',
          index: 2,
        },
        {
          title: 'Review',
          description: 'Review your project details before submission.',
          content: <div>Review your project details here.</div>,
          onComplete: () => console.log('Skipped General Information'),
          fetchResource: '',
          callback: `${baseUrl}/u/${username}/projects`,
          slug: 'review',
          index: 3,
        },
      ]}
    />
  );
}

export default ProjectForm;
