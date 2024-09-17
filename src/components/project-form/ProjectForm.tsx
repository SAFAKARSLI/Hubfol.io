'use client';

import React from 'react';
import * as Form from '@radix-ui/react-form';
import ProjectInfoForm from './form-sections/project-info/ProjectInfoForm';
import FormSection from './form-sections/FormSection';
import { Separator } from '@radix-ui/themes';
import SectionsTable from './form-sections/project-sections/SectionsTable';
import { createProject } from '@/app/actions/project';
import Project from '@/types/project';
import InputLabel from './InputLabel';
import FileInput from './form-sections/project-info/FileInput';
import { usePreloadedFormData } from '@/hooks';

type Props = {
  project: Project;
};

const formSubmitFunction = (formData: FormData) => {
  console.log('Form submitted');
};

function ProjectForm({ project }: Props) {
  const [formAction, editFormData] = usePreloadedFormData(createProject);
  // const createInitiatedProjectWithOwnerId = createInitiatedProject.bind(
  //   null,
  //   project
  // );

  return (
    <Form.Root action={formAction} className="max-w-[50rem] m-5">
      <FormSection
        title="General information"
        description="Enter the project information below. You can edit this information later."
      >
        <ProjectInfoForm project={project} />
        <Form.Field name="project-icon">
          <InputLabel label="Project Icon" />
          <FileInput editFormData={editFormData} />
        </Form.Field>
      </FormSection>

      <Separator orientation="horizontal" size={'4'} />

      <FormSection
        title="Sections"
        description="Sections are different ways by which you can flex your project. This information is visible when the project is active."
      >
        <SectionsTable />
      </FormSection>
      <button type="submit">Submit</button>
    </Form.Root>
  );
}

export default ProjectForm;
