'use client';

import React, { Suspense, useEffect } from 'react';
import FormInput from '../../FormInput';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Section } from '@/types/section';
import { useParams, useSearchParams } from 'next/navigation';
import * as Form from '@radix-ui/react-form';
import SearchTechInput from './SearchTechInput';
import InputLabel from '../../InputLabel';
import { Button, Select, Spinner } from '@radix-ui/themes';
import { Content } from '@prisma/client';
import { upsertSections } from '@/app/actions/section';
import { usePreloadedFormData } from '@/hooks';
import { baseUrl } from '@/utils';
import { useFormStatus } from 'react-dom';
import SubmitButton from '@/components/SubmitButton';

type Props = {};

function SectionForm({}: Props) {
  const [section, setSection] = React.useState<Section>();
  const init = useSearchParams().get('initialize');
  const { sectionUUID, userUUID, projectUUID } = useParams();
  const [formAction, editFormData] = usePreloadedFormData(
    upsertSections,
    `${baseUrl}/u/${userUUID}/projects/${projectUUID}/sections`
  );
  const [contentType, setContentType] = React.useState<Content>(Content.TEXT);

  useEffect(() => {
    const fetchSection = async () => {
      const response = await fetch(`/api/sections/${sectionUUID}`, {
        next: { tags: ['sections'] },
      });
      const data = await response.json();
      setSection(data);
      setContentType(data.contentType);
    };

    fetchSection();
  }, []);

  useEffect(() => {
    editFormData('contentType', contentType);
  }, [contentType]);

  return (
    <Spinner loading={!section}>
      <Form.Root action={formAction} className="flex flex-col gap-2">
        <input type="hidden" name="projectId" value={projectUUID} />
        <input type="hidden" name="uuid" value={sectionUUID} />
        <FormInput
          label="Title"
          required
          defaultValue={section?.title}
          name="title"
          placerholder='Enter the section title here. (e.g "Project Description")'
          type={'text'}
        />

        <FormInput
          label="Description"
          defaultValue={section?.description!}
          name="description"
          placerholder="Enter the section description"
          type={'text'}
        />

        <Form.FormField name="content-type">
          <InputLabel label="Content Type" />
          <Select.Root
            value={contentType}
            onValueChange={(e: keyof typeof Content) => {
              editFormData!('contentType', e);
              setContentType(Content[e]);
            }}
          >
            <Select.Trigger />
            <Select.Content>
              {Object.keys(Content).map((content) => (
                <Select.Item value={content} key={content}>
                  {content.replaceAll('_', ' ')}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Form.FormField>

        <div>
          <InputLabel label="Content" />
          <SearchTechInput onTechAdd={(e) => {}} />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="soft" highContrast color="gray">
            Back
          </Button>
          <SubmitButton>Save Section</SubmitButton>
        </div>
      </Form.Root>
    </Spinner>
  );
}

export default SectionForm;
