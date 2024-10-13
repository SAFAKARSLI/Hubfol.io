'use client';
import { buttonVariants, colorOptions } from '@/utils';
import { Button } from '@radix-ui/themes';
import React from 'react';
import { useFormStatus } from 'react-dom';

type Props = {
  children: React.ReactNode;
  color?: colorOptions;
  variant?: buttonVariants;
  style?: string;
};

function SubmitButton({ children, color, variant, style }: Props) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      loading={pending}
      color={color}
      variant={variant}
      className={style}
    >
      {children}
    </Button>
  );
}

export default SubmitButton;
