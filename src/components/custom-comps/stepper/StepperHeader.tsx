'use client';
import React from 'react';
import { Step as StepType } from './step';
import { Flex, Grid, Separator } from '@radix-ui/themes';
import Step from './Step';
import { useSearchParams } from 'next/navigation';
import { preferredColorOptions } from '@/utils';

type Props = {
  steps: StepType[];
  activeStepIndex: number;
};

function StepperHeader({ steps, activeStepIndex }: Props) {
  return (
    <Flex justify={'center'} align={'center'} gap={'3'} className="my-[3rem]">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <Step
            index={index}
            title={step.title}
            description={step.description}
            maxStepNum={steps.length - 1}
          />
          {index < steps.length - 1 && (
            <Separator
              key={`line-${index}`}
              size={'4'}
              color={
                index < activeStepIndex
                  ? preferredColorOptions.accentColor
                  : 'gray'
              }
            />
          )}
        </React.Fragment>
      ))}
    </Flex>
  );
}

export default StepperHeader;
