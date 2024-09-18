'use client';

import React from 'react';
import * as Form from '@radix-ui/react-form';
import ProjectInfoForm from './form-sections/project-info/ProjectInfoForm';
import FormSection from './form-sections/FormSection';
import { Separator } from '@radix-ui/themes';
import SectionsTable from './form-sections/project-sections/SectionsTable';
import { createProject, upsertGeneralInfo } from '@/app/actions/project';
import Project from '@/types/project';
import InputLabel from './InputLabel';
import FileInput from './form-sections/project-info/FileInput';
import { usePreloadedFormData } from '@/hooks';
import Stepper from '../custom-comps/stepper/Stepper';
import FrameOptionsForm from './form-sections/frame-options/FrameOptionsForm';

type Props = {
  activeStep: number;
};

function ProjectForm({ activeStep = 0 }: Props) {
  return (
    <Stepper
      steps={[
        {
          title: 'General Information',
          description:
            'Enter the project information below. You can edit this information later.',
          content: <ProjectInfoForm />,
          onComplete: upsertGeneralInfo,
        },
        {
          title: 'Sections',
          description:
            'Sections are different ways by which you can flex your project. This information is visible when the project is active.',
          content: <SectionsTable />,
          onComplete: () => console.log('Skipped General Information'),
        },
        {
          title: 'Frame Options',
          description: 'Choose your frame options.',
          content: <FrameOptionsForm />,
          onComplete: () => console.log('Skipped General Information'),
        },
        {
          title: 'Review',
          description: 'Review your project details before submission.',
          content: <div>Review your project details here.</div>,
          onComplete: () => console.log('Skipped General Information'),
        },
      ]}
      activeStep={activeStep}
    />
  );
}

export default ProjectForm;
