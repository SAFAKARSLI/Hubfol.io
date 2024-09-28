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

type Props = {};

function SectionForm({}: Props) {
  const [section, setSection] = React.useState<Section>();
  const init = useSearchParams().get('initialize');
  const { sectionUUID, userUUID, projectUUID } = useParams();
  const [formAction, editFormData] = usePreloadedFormData(
    upsertSections,
    `${baseUrl}/u/${userUUID}/projects/${projectUUID}/sections`
  );
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    if (init) {
      setLoading(false);
      return;
    }
    const fetchSection = async () => {
      const response = await fetch(`/api/sections/${sectionUUID}`);
      const data = await response.json();
      setSection(data);
    };

    fetchSection();
    setLoading(false);
  }, []);

  return (
    <Spinner loading={loading}>
      <Form.Root
        className="m-auto max-w-[900px]  p-8 -md:px-3 flex flex-col gap-3"
        action={formAction}
      >
        <FormInput
          label="Header"
          defaultValue={section?.title}
          name="header"
          placerholder='Enter the section header here. (e.g "Project Description")'
          type={'text'}
        />

        <FormInput
          label="Description"
          defaultValue={section?.title}
          name="description"
          placerholder="Enter the section description"
          type={'text'}
        />

        <Form.FormField name="content-type">
          <InputLabel label="Content Type" />
          <Select.Root
            defaultValue={Content.TEXT}
            onValueChange={(e) => {
              editFormData!('contentType', e);
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

        <Button type="submit">Save Section</Button>
      </Form.Root>
    </Spinner>
  );
}

export default SectionForm;
