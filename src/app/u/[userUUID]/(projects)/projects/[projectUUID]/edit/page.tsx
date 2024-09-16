import { getProject } from '@/app/actions';
import Projects from '@/components/pages/Projects';
import ProjectInfoForm from '@/components/project-form/form-sections/project-info/ProjectInfoForm';
import SectionsForm from '@/components/project-form/form-sections/project-sections/SectionsTable';
import { SlugProps } from '@/types/slug';
import * as Form from '@radix-ui/react-form';
import React from 'react';

export default async function page({ params }: SlugProps) {
  const { userUUID, projectUUID } = params;
  console.log(projectUUID);
  const project = await getProject(projectUUID);
  return (
    <Form.Root>
      <ProjectInfoForm initialValues={{}} />
      <SectionsForm initialValues={project} />
    </Form.Root>
  );
}
