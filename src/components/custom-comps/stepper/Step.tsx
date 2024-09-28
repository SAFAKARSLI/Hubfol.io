import { preferredColorOptions } from '@/utils';
import { Badge, Box, Button } from '@radix-ui/themes';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

type Props = {
  title: string;
  description: string;
  index: number;
  maxStepNum: number;
};

function Step({ title, description, index, maxStepNum }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const activeStep = Number(useSearchParams().get('step') || '0');

  if (activeStep > maxStepNum) {
    router.push(`${pathname}?step=0`);
  }

  const isActive = activeStep === index;

  return (
    <Badge
      variant={activeStep === index ? 'solid' : 'outline'}
      color={
        isActive || activeStep > index
          ? preferredColorOptions.accentColor
          : 'gray'
      }
      // onClick={() => router.push(`${pathname}?step=${index}`)}
      className="h-10 w-1/6  rounded-full px-3"
      size={'1'}
    >
      <p className="text-xxs truncate text-center w-full">
        {index + 1}. {title}
      </p>
    </Badge>
  );
}

export default Step;
