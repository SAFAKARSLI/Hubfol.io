import React, { useEffect } from 'react';
import * as Form from '@radix-ui/react-form';
import ProjectInfoForm from './form-sections/project-info/ProjectInfoForm';
import FormSection from './form-sections/FormSection';
import { Separator } from '@radix-ui/themes';
import SectionsTable from './form-sections/project-sections/SectionsTable';
import { createInitiatedProject } from '@/app/actions/project';
import Project from '@/types/project';
import { useRouter } from 'next/navigation';

type Props = {
  project: Project;
};

function ProjectForm({ project }: Props) {
  const createInitiatedProjectWithOwnerId = createInitiatedProject.bind(
    null,
    project
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
        <SectionsTable sections={project.sections} />
      </FormSection>
      <button type="submit">Submit</button>
    </Form.Root>
  );
}

export default ProjectForm;
