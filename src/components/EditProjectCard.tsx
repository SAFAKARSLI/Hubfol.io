import { Card, Text } from '@radix-ui/themes';
import React from 'react';

type Props = {
  title: string;
  description: string;
  href: string;
};

function EditProjectCard({ title, description, href }: Props) {
  return (
    <Card size={'2'} asChild>
      <a href={href}>
        <Text as="div" size="4" weight="bold">
          {title}
        </Text>
        <Text as="div" color="gray" size="2" className="truncate">
          {description}
        </Text>
      </a>
    </Card>
  );
}

export default EditProjectCard;
