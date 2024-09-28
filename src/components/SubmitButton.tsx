import { Button } from '@radix-ui/themes';
import React from 'react';
import { useFormStatus } from 'react-dom';

type Props = {
  label: string;
};

function SubmitButton({ label }: Props) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" loading={pending}>
      {label}
    </Button>
  );
}

export default SubmitButton;
