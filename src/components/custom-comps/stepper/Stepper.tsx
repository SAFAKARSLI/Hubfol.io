import React from 'react';
import StepperHeader from './StepperHeader';
import { Step } from './step';
import StepperContent from './StepperContent';
import FormWrapper from '@/components/FormWrapper';
import { baseUrl } from '@/utils';
import { useParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

type Props = {
  steps: Step[];
  activeStepIndex: number;
};

function Stepper({ steps, activeStepIndex }: Props) {
  const { user } = useUser();
  return (
    <FormWrapper backButtonUrl={`${baseUrl}/u/${user?.username}/projects`}>
      <StepperHeader steps={steps} activeStepIndex={activeStepIndex} />
      <StepperContent steps={steps} activeStepIndex={activeStepIndex} />
    </FormWrapper>
  );
}

export default Stepper;
