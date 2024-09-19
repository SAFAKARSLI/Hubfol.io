import React, { useState } from 'react';
import StepperHeader from './StepperHeader';
import { Step } from './step';
import StepperContent from './StepperContent';

type Props = {
  steps: Step[];
  activeStepIndex: number;
};

function Stepper({ steps, activeStepIndex }: Props) {
  return (
    <div className="m-auto max-w-[900px]  px-8 -md:px-3">
      <StepperHeader steps={steps} />
      <StepperContent steps={steps} />
    </div>
  );
}

export default Stepper;
