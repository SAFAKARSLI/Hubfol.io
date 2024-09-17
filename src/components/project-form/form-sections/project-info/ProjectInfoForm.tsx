'use client';
import React, { useEffect } from 'react';
import FormInput from '@/components/project-form/FormInput';
import Project from '@/types/project';
import FileInput from './FileInput';
import * as Form from '@radix-ui/react-form';
import InputLabel from '../../InputLabel';
import { deleteProject } from '@/app/actions/project';

type Props = {
  initialValues?: Project;
};

function ProjectInfoForm({ initialValues: project }: Props) {
  useEffect(() => {
    const handleBrowserNavigation = async (e: PopStateEvent) => {
      await deleteProject(project?.uuid!);
      console.log('PROJECT DELETING');
      return;
    };

    window.addEventListener('popstate', handleBrowserNavigation);

    return () => {
      window.removeEventListener('popstate', handleBrowserNavigation);
    };
  });
  return (
    <div className="flex flex-col gap-4 my-5">
      <FormInput
        label="Name"
        name="name"
        placerholder="Enter your project name"
        message="Please enter a valid project name"
        type="text"
        defaultValue={project?.name}
        required
      />
      <FormInput
        label="Tagline"
        name="tagline"
        placerholder="Describe your project in one sentence"
        type="text"
        defaultValue={project?.tagline}
      />

      <FormInput
        label="URL"
        name="url"
        placerholder="Enter the project URL"
        type="text"
        defaultValue={project?.url}
        required
      />

      <Form.Field name="project-icon">
        <InputLabel label="Project Icon" />
        <FileInput />
      </Form.Field>
    </div>
  );
}

export default ProjectInfoForm;
