'use client';

import React, { useEffect } from 'react';
import FormInput from '../../FormInput';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Section } from '@/types/section';
import { useParams } from 'next/navigation';
import * as Form from '@radix-ui/react-form';
import SearchTechInput from './SearchTechInput';
import InputLabel from '../../InputLabel';
import { Button, Select } from '@radix-ui/themes';
import { Content } from '@prisma/client';
import { upsertSections } from '@/app/actions/section';

type Props = {
  editFormData: ((key: string, value: string | Blob) => void) | null;
};

function SectionForm({ editFormData }: Props) {
  const [section, setSection] = React.useState<Section>();
  const { sectionUUID } = useParams();
  const [contentType, setContentType] = React.useState<Content>(Content.TEXT);

  useEffect(() => {
    const fetchSection = async () => {
      const response = await fetch(`/api/section/${sectionUUID}`);
      const data = await response.json();
      setSection(data);
    };

    fetchSection();
  }, []);

  return (
    <Form.Root className="m-auto max-w-[900px]  p-8 -md:px-3 flex flex-col gap-3">
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
          value={contentType}
          onValueChange={(e) => {
            setContentType(e as Content);
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
        <SearchTechInput />
      </div>

      <form action={upsertSections} className="">
        <Button className="float-right">Save</Button>
      </form>
    </Form.Root>
  );
}

export default SectionForm;
