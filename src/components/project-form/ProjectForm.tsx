'use client';
import React from 'react';
import ProjectInfoForm from './form-sections/project-info/ProjectInfoForm';
import SectionsTable from './form-sections/project-sections/SectionsTable';
import { upsertGeneralInfo } from '@/app/actions/project';
import Stepper from '../custom-comps/stepper/Stepper';
import FrameOptionsForm from './form-sections/frame-options/FrameOptionsForm';
import { upsertSections } from '@/app/actions/section';

type Props = {
  activeStepIndex: number;
};

function ProjectForm({ activeStepIndex }: Props) {
  return (
    <Stepper
      activeStepIndex={activeStepIndex}
      steps={[
        {
          title: 'General Information',
          description:
            'Enter the project information below. You can edit this information later.',
          content: (
            <ProjectInfoForm actionResponse={null} editFormData={null} />
          ),
          onComplete: upsertGeneralInfo,
          fetchResource: '',
          index: 0,
        },
        {
          title: 'Sections',
          description:
            'Sections are different ways by which you can flex your project. This information is visible when the project is active.',
          content: <SectionsTable editFormData={null} />,
          onComplete: upsertSections,
          fetchResource: '',
          index: 1,
        },
        {
          title: 'Frame Options',
          description: 'Choose your frame options.',
          content: <FrameOptionsForm />,
          onComplete: () => console.log('Skipped General Information'),
          fetchResource: '',
          index: 2,
        },
        {
          title: 'Review',
          description: 'Review your project details before submission.',
          content: <div>Review your project details here.</div>,
          onComplete: () => console.log('Skipped General Information'),
          fetchResource: '',
          index: 3,
        },
      ]}
    />
  );
}

export default ProjectForm;
