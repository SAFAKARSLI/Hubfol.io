import React from 'react';
import * as Form from '@radix-ui/react-form';
import { Heading, Flex, TextField } from '@radix-ui/themes';
import { InputType } from '@/utils';

type Props = {
  label: string;
  type: string;
  logo?: JSX.Element;
  placerholder: string;
  name: string;
  defaultValue?: string | number;
  onChange?: (e: any) => void;
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
  onChange,
  message,
  required = false,
}: Props) {
  return (
    <Form.Field name={name}>
      <div className="flex-none flex flex-col gap-1">
        <Form.Label asChild>
          <Heading size={'3'} className=" -md:text-sm ">
            {label}{' '}
            <p className="inline text-gray-9 text-xs  font-medium">
              (required)
            </p>
          </Heading>
        </Form.Label>

        <label>
          <Flex align={'center'} gap={'1'}>
            {logo}
            <Form.Control asChild>
              <input
                min={0}
                name={name}
                placeholder={placerholder}
                type={type as InputType}
                defaultValue={defaultValue}
                onChange={onChange}
                className="w-full h-[2rem] p-2 outline-none bg-gray-1 focus:shadow-outline focus:border-violet-7 rounded-md text-sm border border-gray-6 -md:text-xs data-[invalid]:placeholder-red-400 data-[invalid]:border-red-300"
                required={required}
                autoComplete="off"
                color="violet"
              />
            </Form.Control>
          </Flex>
        </label>
        <Form.Message
          match={'valueMissing'}
          name={name}
          className="text-sm text-red-300"
        >
          {message}
        </Form.Message>
      </div>
    </Form.Field>
  );
}

export default FormInput;
