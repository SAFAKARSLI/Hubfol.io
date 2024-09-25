'use client';

import React, { useEffect } from 'react';
import FormInput from '../../FormInput';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Section } from '@/types/section';
import { useParams } from 'next/navigation';
import * as Form from '@radix-ui/react-form';
import SearchTechInput from './SearchTechInput';

type Props = {};

function SectionForm({}: Props) {
  const [section, setSection] = React.useState<Section>();
  const { sectionUUID } = useParams();

  useEffect(() => {
    const fetchSection = async () => {
      const response = await fetch(`/api/section/${sectionUUID}`);
      const data = await response.json();
      setSection(data);
    };

    fetchSection();
  }, []);

  return (
    <Form.Root>
      <FormInput
        label="Header"
        defaultValue={section?.title}
        name="header"
        placerholder='Enter the section header here. (e.g "Project Description"'
        type={section?.contentType!}
        logo={<MagnifyingGlassIcon />}
      />
      <SearchTechInput />
    </Form.Root>
  );
}

export default SectionForm;
