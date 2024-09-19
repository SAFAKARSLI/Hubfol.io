'use client';
import { usePreloadedFormData } from '@/hooks';
import React, { cloneElement, useEffect, useRef, useState } from 'react';
import { Step } from './step';
import FormSection from '@/components/project-form/form-sections/FormSection';
import * as Form from '@radix-ui/react-form';
import StepperNavigation from './StepperNavigation';
import { Separator } from '@radix-ui/themes';
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

type Props = {
  steps: Step[];
};

function StepperContent({ steps }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeStepIndex = parseInt(searchParams.get('step')!);
  const activeStep = steps[activeStepIndex];
  const [formAction, editFormData, actionResponse] = usePreloadedFormData(
    activeStep.onComplete
  );

  return (
    <Form.Root
      action={formAction}
      onSubmit={(e) => {
        router.push(`${pathname}?step=${activeStepIndex + 1}`);
      }}
    >
      <FormSection
        title={activeStep.title}
        description={activeStep.description}
      >
        {cloneElement(activeStep.content as React.ReactElement, {
          editFormData,
          actionResponse,
        })}
      </FormSection>
      <StepperNavigation maxStepNum={steps.length - 1} />
    </Form.Root>
  );
}

export default StepperContent;
