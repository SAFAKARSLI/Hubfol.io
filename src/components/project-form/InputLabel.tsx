import { Heading } from '@radix-ui/themes';
import React from 'react';

type Props = {
  label: string;
  required?: boolean;
  charLimit?: number;
  currentCharCount?: number;
};

function InputLabel({
  label,
  required = false,
  charLimit,
  currentCharCount,
}: Props) {
  return (
    <Heading size={'3'} className=" -md:text-sm mb-1">
      {label}{' '}
      {required && (
        <p className="inline text-gray-9 text-xs  font-medium">(required)</p>
      )}
      {charLimit && (
        <p className="float-right inline text-gray-9 text-xs  font-medium">
          {currentCharCount}/{charLimit}
        </p>
      )}
    </Heading>
  );
}

export default InputLabel;
