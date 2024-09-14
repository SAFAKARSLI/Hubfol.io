import * as Form from '@radix-ui/react-form';
import { Heading } from '@radix-ui/themes';
import React from 'react';

type Props = {
  label: string;
  required?: boolean;
};

function InputLabel({ label, required = false }: Props) {
  return (
    <Form.Label asChild>
      <Heading size={'3'} className=" -md:text-sm mb-1">
        {label}{' '}
        {required && (
          <p className="inline text-gray-9 text-xs  font-medium">(required)</p>
        )}
      </Heading>
    </Form.Label>
  );
}

export default InputLabel;
