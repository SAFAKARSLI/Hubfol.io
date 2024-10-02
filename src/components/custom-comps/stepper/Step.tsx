import { preferredColorOptions } from '@/utils';
import { Badge, Box, Button } from '@radix-ui/themes';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

type Props = {
  title: string;
  description: string;
  index: number;
  activeStepIndex: number;
  maxStepNum: number;
};

function Step({
  title,
  description,
  index,
  maxStepNum,
  activeStepIndex,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  if (activeStepIndex > maxStepNum) {
    router.push(`${pathname}?step=0`);
  }

  const isActive = activeStepIndex === index;

  return (
    <Badge
      variant={activeStepIndex === index ? 'solid' : 'outline'}
      color={
        isActive || activeStepIndex > index
          ? preferredColorOptions.accentColor
          : 'gray'
      }
      className="h-10 w-1/5  rounded-full px-3"
      size={'1'}
    >
      <p className="text-xxs truncate text-center w-full">
        {index + 1}. {title}
      </p>
    </Badge>
  );
}

export default Step;
