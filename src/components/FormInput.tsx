import React from 'react';

import { Heading, Flex } from '@radix-ui/themes';

type Props = {
  label: string;
  type: string;
  logo?: JSX.Element;
  placerholder: string;
  name: string;
  value: string | number;
  onChange?: (e: any) => void;
};

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
      <Heading size={'4'} className="pb-1">
        {label}
      </Heading>
      <label>
        <Flex align={'center'} gap={'1'}>
          {logo}
          <input
            min={0}
            name={name}
            placeholder={placerholder}
            type={type}
            value={value}
            onChange={onChange}
            className="p-2 border border-gray-5 rounded text-sm w-full"
          />
        </Flex>
      </label>
    </div>
  );
}

export default FormInput;
