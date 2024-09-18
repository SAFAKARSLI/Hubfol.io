import React from 'react';
import StepperHeader from './StepperHeader';
import { Step } from './step';
import StepperContent from './StepperContent';

type Props = {
  steps: Step[];
  activeStep: number;
};

function Stepper({ steps, activeStep }: Props) {
  if (activeStep > steps.length - 1 || activeStep < 0) {
    activeStep = 0;
  }
  return (
    <div className="m-auto max-w-[900px]  px-8 -md:px-3">
      <StepperHeader steps={steps} />
      <StepperContent step={steps[activeStep]} maxStepNum={steps.length - 1} />
    </div>
  );
}

export default Stepper;
