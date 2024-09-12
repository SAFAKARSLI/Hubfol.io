import React from 'react';
import * as Form from '@radix-ui/react-form';
import ProjectInfoForm from './form-sections/project-info/ProjectInfoForm';
import Project from '@/types/project';
import FormSection from './form-sections/FormSection';
import { Separator } from '@radix-ui/themes';
import SectionsTable from './form-sections/project-sections/SectionsTable';

type Props = {
  initialValues?: Project;
};

function ProjectForm({ initialValues }: Props) {
  return (
    <Form.Root asChild>
      <div id="sections" className="max-w-[50rem] m-5">
        <FormSection
          title="General information"
          description="Enter the project information below. You can edit this information later."
        >
          <ProjectInfoForm initialValues={initialValues} />
        </FormSection>

        <Separator orientation="horizontal" className="my-5" size={'4'} />

        <FormSection
          title="Sections"
          description="Sections are different ways by which you can flex your project. This information is visible when the project is active."
        >
          <SectionsTable initialValues={initialValues} />
        </FormSection>
      </div>
    </Form.Root>
  );
}

export default ProjectForm;
