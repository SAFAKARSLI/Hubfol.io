import { CheckIcon } from '@radix-ui/react-icons';
import { Badge, Heading, Text } from '@radix-ui/themes';
import React from 'react';

type Props = {
  title: string;
  aiBanner?: boolean;
  text: string;
};

function ListItem({ title, text, aiBanner }: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4 ">
        <CheckIcon className="w-6 h-6 text-violet-8" />
        <Heading as="h3" className="text-lg mb-2 ">
          {title}
        </Heading>
        {aiBanner && (
          <Badge
            variant="solid"
            size={'2'}
            className="italic font-serif text-lg text-white"
          >
            AI
          </Badge>
        )}
      </div>
      <Text className="pl-10 text-gray-11 text-sm">{text}</Text>
    </div>
  );
}

export default ListItem;
