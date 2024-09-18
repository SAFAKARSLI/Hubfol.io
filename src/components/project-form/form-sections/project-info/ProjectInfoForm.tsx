'use client';
import React from 'react';
import FormInput from '@/components/project-form/FormInput';
import * as Form from '@radix-ui/react-form';
import InputLabel from '../../InputLabel';
import FileInput from './FileInput';

type Props = {
  editFormData?: (key: string, value: string | Blob) => void;
};

function ProjectInfoForm({ editFormData }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <FormInput
        label="Name"
        name="name"
        placerholder="Enter your project name"
        message="You must provide a valid project name"
        type="text"
        required
      />
      <FormInput
        label="Tagline"
        name="tagline"
        placerholder="Describe your project in one sentence"
        type="text"
      />
      <FormInput
        label="URL"
        name="url"
        placerholder="Enter the project URL"
        message="You must provide a full valid project URL. (must include http:// or https://)"
        type="url"
        required
      />
      <Form.Field name="project-icon">
        <InputLabel label="Project Icon" />
        <FileInput editFormData={editFormData!} />
      </Form.Field>
    </div>
  );
}

export default ProjectInfoForm;
