"use client";

import React from "react";
import * as Form from "@radix-ui/react-form";
import { Heading, Flex, TextField } from "@radix-ui/themes";
import { InputType } from "@/utils";
import InputLabel from "./InputLabel";

type Props = {
  pattern?: string;
  label?: string;
  type: string;
  style?: string;
  value?: string;
  setValue?: (value: string) => void;
  logo?: JSX.Element;
  description?: string;
  placeholder?: string;
  name: string;
  defaultValue?: string | number;
  message?: string;
  required?: boolean;
  charLimit?: number;
  minLength?: number;
  disabled?: boolean;
  step?: number;
  forceMatch?: boolean;
};

function FormInput({
  pattern,
  label,
  type,
  logo,
  name,
  placeholder,
  description,
  value,
  setValue,
  defaultValue,
  message,
  required = false,
  charLimit,
  minLength,
  disabled,
  step,
  style,
  forceMatch,
}: Props) {
  const [currentValue, setCurrentValue] = React.useState<
    string | number | undefined
  >(defaultValue);

  return (
    <Form.Field name={name} serverInvalid={forceMatch}>
      <InputLabel
        label={label as string}
        required={required}
        charLimit={charLimit}
        currentCharCount={currentValue ? String(currentValue).length : 0}
      />
      <p className="text-xs text-gray-11 mb-1">{description}</p>
      <Flex align={"center"} gap={"1"}>
        {logo}
        <Form.Control asChild>
          <input
            disabled={disabled}
            pattern={pattern}
            minLength={minLength}
            min={0}
            value={value}
            step={step}
            max={9999}
            maxLength={charLimit}
            name={name}
            onChange={(e) => {
              if (setValue) {
                setValue(e.target.value);
              }
              setCurrentValue(e.target.value);
            }}
            placeholder={placeholder}
            type={type as InputType}
            defaultValue={defaultValue}
            className={`w-full h-[2rem] p-2 outline-none bg-gray-1 focus:shadow-outline focus:border-violet-7 rounded-md text-sm border 
            border-gray-6 -md:text-xs data-[invalid]:placeholder-red-400 data-[invalid]:border-red-300 ${
              disabled ? "cursor-not-allowed text-gray-11 border-green-800" : ""
            } ${style}`}
            required={required}
            autoComplete="off"
            color="violet"
          />
        </Form.Control>
      </Flex>
      <Form.Message
        match={"typeMismatch"}
        className="text-xs text-red-500"
        forceMatch={forceMatch}
      >
        {message}
      </Form.Message>

      <Form.Message match={"valueMissing"} className="text-xs text-red-500">
        You must provide a response.
      </Form.Message>
      <Form.Message match={"patternMismatch"} className="text-xs text-red-500">
        {message}
      </Form.Message>
      <Form.Message match={"rangeOverflow"} className="text-xs text-red-500">
        You must provide a number less than 9999.
      </Form.Message>
      <Form.Message match={"rangeUnderflow"} className="text-xs text-red-500">
        Your hourly rate cannot be less than 0.
      </Form.Message>
    </Form.Field>
  );
}

export default FormInput;
