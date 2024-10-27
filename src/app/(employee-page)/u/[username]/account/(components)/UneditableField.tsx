import { Heading } from '@radix-ui/themes';
import React from 'react';

type Props = {
  title: string;
  value: string;
};

function UneditableField({ title, value }: Props) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Heading as="h4" className="text-lg text-gray-10">
          {title}
        </Heading>
      </div>
      <div className="flex items-center bg-gray-1  border border-green-800 p-2 rounded  w-full">
        <p className={`text-gray-10 flex-grow`}>{value}</p>
      </div>
    </div>
  );
}

export default UneditableField;
