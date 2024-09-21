'use client';
import React from 'react';
import FormInput from '@/components/project-form/FormInput';
import * as Form from '@radix-ui/react-form';
import InputLabel from '../../InputLabel';
import FileInput from './FileInput';
import Project from '@/types/project';

type Props = {
  editFormData: ((key: string, value: string | Blob) => void) | null;
  actionResponse: any | null;
};

function ProjectInfoForm({ editFormData, actionResponse }: Props) {
  console.log(actionResponse);
  return (
    <div className="flex flex-col gap-4">
      <FormInput
        label="Name"
        name="name"
        placerholder="Enter your project name"
        defaultValue={actionResponse.data?.name}
        message="You must provide a valid project name"
        type="text"
        required
      />
      <FormInput
        label="Tagline"
        name="tagline"
        defaultValue={actionResponse.data?.tagline}
        placerholder="Describe your project in one sentence"
        type="text"
      />
      <FormInput
        label="URL"
        name="url"
        defaultValue={actionResponse.data?.url}
        placerholder="Enter the project URL"
        message="You must provide a valid URL. (must include http:// or https://)"
        type="url"
        required
      />
      <Form.Field name="project-icon">
        <InputLabel label="Project Icon" />
        <FileInput
          editFormData={editFormData!}
          defaultValue={actionResponse.data?.iconLink}
        />
      </Form.Field>
    </div>
  );
}

export default ProjectInfoForm;
