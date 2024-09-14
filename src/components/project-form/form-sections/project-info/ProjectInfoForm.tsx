import React from 'react';
import FormInput from '@/components/project-form/FormInput';
import Project from '@/types/project';
import FileInput from './FileInput';
import * as Form from '@radix-ui/react-form';
import InputLabel from '../../InputLabel';

type Props = {
  initialValues?: Project;
};

function ProjectInfoForm({ initialValues: project }: Props) {
  return (
    <div className="flex flex-col gap-4 my-5">
      <FormInput
        label="Title"
        name="title"
        placerholder="Enter your project name"
        message="Please enter a valid project name"
        type="text"
        defaultValue={project?.title}
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
