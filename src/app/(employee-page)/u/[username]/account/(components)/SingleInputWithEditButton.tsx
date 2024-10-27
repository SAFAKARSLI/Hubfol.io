'use client';

import { CheckIcon, Cross1Icon, Cross2Icon } from '@radix-ui/react-icons';
import { Button, Heading, IconButton, Text } from '@radix-ui/themes';
import React, { cloneElement, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import * as Form from '@radix-ui/react-form';
import SubmitButton from '@/components/SubmitButton';
import { useUser } from '@clerk/nextjs';
import UsernameInput from '@/components/UsernameInput';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import { useRouter } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  title: string;
  defaultValue: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  charLimit?: number;
  onSubmit?: (formData: FormData) => any;
};

function SingleInputWithEditButton({
  children,
  title,
  defaultValue,
  name,
  disabled = false,
  placeholder,
  required,
  charLimit,
  onSubmit,
}: Props) {
  const [editActive, setEditActive] = useState(false);

  const { user } = useUser();
  const [value, setValue] = useState<any>(defaultValue);
  const formRef = React.useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Heading as="h4" className="text-lg -2xl:text-md text-wrap">
          {title}
        </Heading>
        {!disabled && (
          <IconButton
            disabled={loading}
            variant="ghost"
            className="hover:cursor-pointer"
            onClick={() => {
              setEditActive(!editActive);
            }}
          >
            <FaEdit />
          </IconButton>
        )}
      </div>
      {editActive ? (
        <Form.Root
          ref={formRef}
          className="flex items-center   border border-gray-4 p-3 rounded gap-3  w-full"
        >
          <div className="flex-grow">
            {cloneElement(children as React.ReactElement, {
              charLimit,
              defaultValue,
              setValue,
            })}
          </div>
          <div className="flex items-center gap-3 ">
            <Button
              color="green"
              size="1"
              type="button"
              loading={loading}
              onClick={async () => {
                setLoading(true);
                await onSubmit!(new FormData(formRef.current!));
                window.location.reload();
              }}
            >
              <CheckIcon /> Submit
            </Button>
            <Button
              disabled={loading}
              size={'1'}
              color="red"
              variant="ghost"
              onClick={() => {
                setEditActive(false);
              }}
            >
              <Cross2Icon /> Cancel
            </Button>
          </div>
          <input type="hidden" name="fieldName" value={name} />
          <input type="hidden" name="userId" value={user?.id} />
          <input type="hidden" name={name} value={value} />
        </Form.Root>
      ) : (
        <Text as="div" className="text-gray-9  p-2">
          {defaultValue}
        </Text>
      )}
    </div>
  );
}

export default SingleInputWithEditButton;
