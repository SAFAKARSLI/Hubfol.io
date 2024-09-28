'use client';
import React, { Suspense, useEffect } from 'react';
import FormInput from '@/components/project-form/FormInput';
import * as Form from '@radix-ui/react-form';
import InputLabel from '../../InputLabel';
import FileInput from './FileInput';
import { baseUrl } from '@/utils';
import { useParams, useSearchParams } from 'next/navigation';
import Project from '@/types/project';
import { Spinner } from '@radix-ui/themes';

type Props = {
  editFormData: ((key: string, value: string | Blob) => void) | null;
};

function ProjectInfoForm({ editFormData }: Props) {
  const init = useSearchParams().get('initialize');
  const [project, setProject] = React.useState<Project>();
  const { projectUUID } = useParams();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    if (init) {
      setLoading(false);
      return;
    }
    const fetchProject = async () => {
      const response = await fetch(`${baseUrl}/api/projects/${projectUUID}`, {
        next: { tags: ['projects'] },
      });
      const data = await response.json();
      setProject(data);
      editFormData!('projectUUID', data.uuid);
    };

    fetchProject();
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Spinner size={'3'} loading={loading}>
        <FormInput
          label="Name"
          name="name"
          placerholder="Enter your project name"
          message="You must provide a valid project name"
          defaultValue={project?.name}
          type="text"
          required
        />
        <FormInput
          label="Tagline"
          name="tagline"
          placerholder="Describe your project in one sentence"
          defaultValue={project?.tagline}
          type="text"
        />
        <FormInput
          label="URL"
          name="url"
          placerholder="Enter the project URL"
          message="You must provide a valid URL. (must include http:// or https://)"
          defaultValue={project?.url}
          type="url"
          required
        />
        <Form.Field name="project-icon">
          <InputLabel label="Project Icon" />
          <FileInput
            editFormData={editFormData!}
            defaultValue={project?.iconLink}
          />
        </Form.Field>
      </Spinner>
    </div>
  );
}

export default ProjectInfoForm;
