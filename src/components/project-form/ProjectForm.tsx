import React from 'react';
import * as Form from '@radix-ui/react-form';
import ProjectInfoForm from './form-sections/project-info/ProjectInfoForm';
import FormSection from './form-sections/FormSection';
import { Separator } from '@radix-ui/themes';
import SectionsTable from './form-sections/project-sections/SectionsTable';
import { createInitiatedProject } from '@/app/actions/project';

type Props = {
  userUUID: string;
};

async function ProjectForm({ userUUID }: Props) {
  const createInitiatedProjectWithOwnerId = createInitiatedProject.bind(
    null,
    userUUID
  );

  return (
    <Form.Root
      action={createInitiatedProjectWithOwnerId}
      className="max-w-[50rem] m-5"
    >
      <FormSection
        title="General information"
        description="Enter the project information below. You can edit this information later."
      >
        <ProjectInfoForm />
      </FormSection>

      <Separator orientation="horizontal" className="my-5" size={'4'} />

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
