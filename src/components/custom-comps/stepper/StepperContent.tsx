import React from 'react';
import { Step } from './step';
import FormSection from '@/components/project-form/form-sections/FormSection';

type Props = {
  step: Step;
};

function StepperContent({ step }: Props) {
  return (
    <FormSection title={step.title} description={step.description}>
      {step.content}
    </FormSection>
  );
}

export default StepperContent;
