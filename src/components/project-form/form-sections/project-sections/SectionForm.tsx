'use client';

import React, { Suspense, useEffect } from 'react';
import FormInput from '../../FormInput';
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
import SubmitButton from '@/components/SubmitButton';
import { useRouter } from 'next/navigation';
import CarouselForm from './CarouselForm';
import TextSectionInput from './TextSectionInput';
import { Brand } from '@/types/brand';
import { parse } from 'path';

type Props = {
  initial?: boolean;
};

function SectionForm({ initial = false }: Props) {
  const [section, setSection] = React.useState<Section>();
  const router = useRouter();
  const { sectionUUID, username, projectUUID } = useParams();
  const [formAction, editFormData] = usePreloadedFormData(
    upsertSections,
    `${baseUrl}/u/${username}/projects/${projectUUID}/sections`
  );
  const [contentType, setContentType] = React.useState<Content>(Content.TEXT);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchSection = async () => {
      const response = await fetch(`/api/sections/${sectionUUID}`, {
        next: { tags: ['sections'] },
      });
      const data = await response.json();
      setSection(data);
      setContentType(data.contentType);
    };

    if (!initial) fetchSection();
  }, []);

  useEffect(() => {
    if (section || initial) setLoading(false);
  }, [section]);

  useEffect(() => {
    editFormData('contentType', contentType);
  }, [contentType]);

  function renderContentInput() {
    const initialValue =
      section?.contentType === contentType ? section.content : undefined;

    switch (contentType) {
      case Content.TEXT:
        return (
          <TextSectionInput initialValue={(initialValue as string) ?? ''} />
        );

      case Content.BRAND_STACK:
        return <SearchTechInput initialValue={(initialValue as any[]) ?? []} />;
      case Content.CAROUSEL: // Can be used to show code snippets (Code Snippet Section)
        return (
          <CarouselForm
            editFormData={editFormData}
            initialValue={(initialValue as any[]) ?? []}
          />
        );
      // case Content.ATTACHMENT:
      //   return <></>;
      // case Content.VIDEO:
      //   return <></>;
      // case Content.ANALYTICS:
      //   return <></>;
      // case Content.TESTIOMONIALS:
      //   return <></>;
    }
  }

  return (
    <Spinner loading={loading}>
      <Form.Root action={formAction} className="flex flex-col gap-3">
        <input type="hidden" name="projectId" value={projectUUID} />
        <input type="hidden" name="uuid" value={sectionUUID} />
        <input
          type="hidden"
          name="prev-section"
          value={JSON.stringify(section)}
        />
        <FormInput
          label="Title"
          required
          defaultValue={section?.title}
          name="title"
          placeholder='Enter the section title here. (e.g "Project Description")'
          type={'text'}
          charLimit={50}
        />

        <FormInput
          label="Description"
          description='Use descriptions to provide a brief overview of the section content. Although there is no character limit for the description, we recommend using "TEXT" section for lengthy texts.'
          defaultValue={section?.description!}
          name="description"
          placeholder="Enter the section description"
          type={'text'}
        />

        <Form.FormField name="content-type">
          <InputLabel label="Content" />
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
          {/* <InputLabel label="Content" /> */}
          {renderContentInput()}
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="soft"
            color="gray"
            type="button"
            onClick={() => router.back()}
          >
            {initial ? <>Cancel</> : <>Back</>}
          </Button>
          <SubmitButton>
            {initial ? <>Create Section</> : <>Save</>}
          </SubmitButton>
        </div>
      </Form.Root>
    </Spinner>
  );
}

export default SectionForm;
