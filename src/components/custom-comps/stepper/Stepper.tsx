import React from 'react';
import StepperHeader from './StepperHeader';
import { Step } from './step';
import StepperContent from './StepperContent';
import StepperNavigation from './StepperNavigation';

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
      <StepperContent step={steps[activeStep]} />
      <StepperNavigation
        maxStepNum={steps.length - 1}
        onNextStep={() => console.log('nextstep')}
      />
    </div>
  );
}

export default Stepper;
