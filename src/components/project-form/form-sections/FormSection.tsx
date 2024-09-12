import { Heading, Text } from '@radix-ui/themes';
import React from 'react';

type Props = {
  title: string;
  description: string;
  children: React.ReactNode;
};

function FormSection({ title, description, children }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <Heading>{title}</Heading>
      <Text size="3" as="p" className="text-sm">
        {description}
      </Text>
      {children}
    </div>
  );
}

export default FormSection;
