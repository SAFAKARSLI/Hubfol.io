import React from 'react';
import FormInput from '@/components/project-form/FormInput';
import Project from '@/types/project';

type Props = {
  project: Project;
};

function ProjectInfoForm({ project }: Props) {
  return (
    <div className="flex flex-col gap-4 ">
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
        defaultValue={project?.tagline}
      />
      <FormInput
        label="URL"
        name="url"
        placerholder="Enter the project URL"
        message="You must provide a valid project URL"
        type="text"
        defaultValue={project?.url}
        required
      />
    </div>
  );
}

export default ProjectInfoForm;
