'use client';
import React, { cloneElement, useRef } from 'react';
import { Step } from './step';
import FormSection from '@/components/project-form/form-sections/FormSection';
import * as Form from '@radix-ui/react-form';
import { usePreloadedFormData } from '@/hooks';
import StepperNavigation from './StepperNavigation';

type Props = {
  step: Step;
  maxStepNum: number;
};

function StepperContent({ step, maxStepNum }: Props) {
  const [formAction, editFormData] = usePreloadedFormData(step.onComplete);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <FormSection title={step.title} description={step.description}>
      <Form.Root action={formAction} ref={formRef}>
        {cloneElement(step.content as React.ReactElement, { editFormData })}
        <StepperNavigation maxStepNum={maxStepNum} formRef={formRef} />
      </Form.Root>
    </FormSection>
  );
}

export default StepperContent;
