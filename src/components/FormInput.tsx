import React from 'react';

import { Heading, Flex, TextField } from '@radix-ui/themes';

type Props = {
  label: string;
  type: string;
  logo?: JSX.Element;
  placerholder: string;
  name: string;
  value?: string | number;
  onChange?: (e: any) => void;
};

type InputType =
  | 'number'
  | 'search'
  | 'time'
  | 'text'
  | 'hidden'
  | 'tel'
  | 'url'
  | 'email'
  | 'date'
  | 'datetime-local'
  | 'month'
  | 'password'
  | 'week'
  | undefined;

function FormInput({
  label,
  type,
  logo,
  name,
  placerholder,
  value,
  onChange,
}: Props) {
  return (
    <div>
      <Heading size={'4'} className="pb-2">
        {label}
      </Heading>
      <label>
        <Flex align={'center'} gap={'1'}>
          {logo}
          <TextField.Root
            size={'3'}
            min={0}
            name={name}
            placeholder={placerholder}
            type={type as InputType}
            value={value}
            onChange={onChange}
            className="text-m w-full"
          />
        </Flex>
      </label>
    </div>
  );
}

export default FormInput;
