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
  const [text, setText] = React.useState(defaultValue);
  return (
    <div className="flex gap-2 items-center">
      <input
        required={required}
        name={name}
        onChange={(e) => {
          setText(e.target.value);
          setValue!(e.target.value);
        }}
        placeholder={placeholder}
        maxLength={charLimit}
        className={`text-gray-12 w-full bg-gray-1 rounded border border-gray-6 p-2 focus:shadow-outline focus:border-violet-7`}
        defaultValue={defaultValue}
        disabled={disabled}
      />
      {charLimit && (
        <p className="float-right text-gray-10 text-xs">
          {text?.length}/{charLimit}
        </p>
      )}
    </div>
  );
}

export default TextInput;
