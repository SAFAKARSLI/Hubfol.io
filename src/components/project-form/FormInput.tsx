import React from 'react';
import * as Form from '@radix-ui/react-form';
import { Heading, Flex, TextField } from '@radix-ui/themes';
import { InputType } from '@/utils';
import InputLabel from './InputLabel';

type Props = {
  label: string;
  type: string;
  logo?: JSX.Element;
  placerholder: string;
  name: string;
  defaultValue?: string | number;
  message?: string;
  required?: boolean;
};

function FormInput({
  label,
  type,
  logo,
  name,
  placerholder,
  defaultValue,
  message,
  required = false,
}: Props) {
  return (
    <Form.Field name={name}>
      <InputLabel label={label} required={required} />

      <Flex align={'center'} gap={'1'}>
        {logo}
        <Form.Control asChild>
          <input
            min={0}
            name={name}
            placeholder={placerholder}
            type={type as InputType}
            defaultValue={defaultValue}
            className="w-full h-[2rem] p-2 outline-none bg-gray-1 focus:shadow-outline focus:border-violet-7 rounded-md text-sm border border-gray-6 -md:text-xs data-[invalid]:placeholder-red-400 data-[invalid]:border-red-300"
            required={required}
            autoComplete="off"
            color="violet"
          />
        </Form.Control>
      </Flex>
      <Form.Message
        match={'typeMismatch'}
        name={name}
        className="text-sm text-red-300"
      >
        {message}
      </Form.Message>
      <Form.Message match={'valueMissing'} className="text-sm text-red-300">
        You must provide `<b>{label}</b>`
      </Form.Message>
    </Form.Field>
  );
}

export default FormInput;
