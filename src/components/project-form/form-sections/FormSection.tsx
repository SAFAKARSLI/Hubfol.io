import { Heading, Spinner, Text } from '@radix-ui/themes';
import React, { Suspense } from 'react';

type Props = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

function FormSection({ title, description, children }: Props) {
  return (
    <div className="flex flex-col gap-4 ">
      <Heading>{title}</Heading>
      {description && (
        <Text size="3" as="p" className="text-sm text-gray-11">
          {description}
        </Text>
      )}
      <Suspense fallback={<Spinner />}>{children}</Suspense>
    </div>
  );
}

export default FormSection;
