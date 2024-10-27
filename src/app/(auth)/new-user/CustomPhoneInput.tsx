'use client';

import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import { E164Number } from 'libphonenumber-js';
import { StringifyOptions } from 'querystring';

type Props = {
  setValue?: (value: E164Number) => void;
};

function CustomPhoneInput({ setValue: onChange }: Props) {
  const [value, setValue] = useState<E164Number>();

  useEffect(() => {
    if (onChange) {
      onChange(value as E164Number);
    }
  }, [value]);

  return (
    <div>
      <PhoneInput
        onChange={setValue}
        value={value}
        defaultCountry="US"
        placeholder="Enter phone number"
        className="w-full h-[2rem] p-2 mt-1 outline-none bg-gray-1 focus:shadow-outline focus:border-violet-7 rounded-md text-sm border border-gray-6 -md:text-xs data-[invalid]:placeholder-red-400 data-[invalid]:border-red-300"
      />
      <input type="hidden" name="phoneNumber" value={value} />
    </div>
  );
}

export default CustomPhoneInput;
