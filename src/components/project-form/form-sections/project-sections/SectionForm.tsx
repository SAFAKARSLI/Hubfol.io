import React from 'react';
import FormInput from '../../FormInput';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Section } from '@/types/section';

type Props = {
  section: Section;
};

function SectionForm({ section }: Props) {
  return (
    <div>
      <FormInput
        label="Header"
        defaultValue={section.title}
        name="header"
        placerholder='Enter the section header here. (e.g "Project Description"'
        type={section.contentType}
        logo={<MagnifyingGlassIcon />}
      />
    </div>
  );
}

export default SectionForm;
