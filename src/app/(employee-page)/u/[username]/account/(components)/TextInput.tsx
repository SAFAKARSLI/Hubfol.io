'use client';

import React from 'react';

type Props = {
  title?: string;
  setValue?: (value: any) => void;
  defaultValue?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  charLimit?: number;
};

function TextInput({
  title,
  defaultValue,
  name,
  placeholder,
  disabled,
  required,
  charLimit,
  setValue,
}: Props) {
  return (
    <input
      required={required}
      name={name}
      onChange={(e) => {
        setValue!(e.target.value);
      }}
      placeholder={placeholder}
      maxLength={charLimit}
      className={`text-gray-12 w-full bg-gray-1 rounded border border-gray-6 p-2 focus:shadow-outline focus:border-violet-7`}
      defaultValue={defaultValue}
      disabled={disabled}
    />
  );
}

export default TextInput;
