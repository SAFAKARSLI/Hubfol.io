'use client';
import React, { useEffect } from 'react';
import FormInput from '@/components/project-form/FormInput';
import * as Form from '@radix-ui/react-form';
import InputLabel from '../../InputLabel';
import FileInput from './FileInput';
import { allowedIconTypes, baseUrl } from '@/utils';
import { useParams, useSearchParams } from 'next/navigation';
import Project from '@/types/project';
import { Spinner } from '@radix-ui/themes';

type Props = {
  editFormData: ((key: string, value: string | Blob) => void) | null;
};

function ProjectInfoForm({ editFormData }: Props) {
  const init = useSearchParams().get('initialize');
  const { projectUUID } = useParams();
  const [project, setProject] = React.useState<Project>();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      const response = await fetch(`${baseUrl}/api/projects/${projectUUID}`, {
        next: { tags: ['projects'] },
      });
      const data = await response.json();
      setProject(data);
    };

    if (!init) {
      fetchProject();
    }
  }, []);

  useEffect(() => {
    if (project || init) {
      setLoading(false);
    }
  }, [project]);

  return (
    <Spinner loading={loading}>
      <div className="flex flex-col gap-4">
        <input type="hidden" name="uuid" value={projectUUID} />
        <input
          type="hidden"
          name="prev-project"
          value={JSON.stringify(project)}
        />
        <FormInput
          label="Name"
          pattern="^[a-zA-Z0-9 ]+$"
          name="name"
          placeholder="Enter your project name"
          charLimit={24}
          message="Cannot contain special characters"
          defaultValue={project?.name}
          type="text"
          required
        />
        <FormInput
          label="Tagline"
          name="tagline"
          charLimit={38}
          placeholder="Describe your project in one sentence"
          defaultValue={project?.tagline}
          type="text"
        />

        <Form.Field name="project-icon">
          <InputLabel label="Project Icon" />
          <FileInput
            formDataSlug="iconLink"
            accept={allowedIconTypes}
            editFormData={editFormData!}
            defaultValue={project?.iconLink}
          />
        </Form.Field>
      </div>
    </Spinner>
  );
}

export default ProjectInfoForm;
