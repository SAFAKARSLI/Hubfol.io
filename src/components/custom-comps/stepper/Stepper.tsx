import React from 'react';
import StepperHeader from './StepperHeader';
import { Step } from './step';
import StepperContent from './StepperContent';
import FormWrapper from '@/components/FormWrapper';
import { baseUrl } from '@/utils';
import { employeeHomeRedirect } from '@/app/actions/user';
import { useParams } from 'next/navigation';

type Props = {
  steps: Step[];
  activeStepIndex: number;
};

function Stepper({ steps, activeStepIndex }: Props) {
  const { userUUID } = useParams();
  return (
    <FormWrapper
      backButtonAction={() => employeeHomeRedirect(userUUID as string)}
    >
      <StepperHeader steps={steps} activeStepIndex={activeStepIndex} />
      <StepperContent steps={steps} activeStepIndex={activeStepIndex} />
    </FormWrapper>
  );
}

export default Stepper;
