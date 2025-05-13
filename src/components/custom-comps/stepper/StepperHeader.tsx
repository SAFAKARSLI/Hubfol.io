"use client";
import React from "react";
import { Flex, Separator } from "@radix-ui/themes";
import { preferredColorOptions } from "@/utils";
import Step from "./Step";
import { Step as StepType } from "@/types/step";

type Props = {
  steps: StepType[];
  activeStepIndex: number;
};

function StepperHeader({ steps, activeStepIndex }: Props) {
  return (
    <Flex justify={"center"} align={"center"} gap={"3"} className="mb-[2rem]">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <Step
            index={index}
            activeStepIndex={activeStepIndex}
            title={step.title}
            description={step.description}
            maxStepNum={steps.length - 1}
          />
          {index < steps.length - 1 && (
            <Separator
              key={`line-${index}`}
              size={"4"}
              color={
                index < activeStepIndex
                  ? preferredColorOptions.accentColor
                  : "gray"
              }
            />
          )}
        </React.Fragment>
      ))}
    </Flex>
  );
}

export default StepperHeader;
