"use client";
import { usePreloadedFormData } from "@/hooks";
import React, { cloneElement } from "react";
import { Step } from "./step";
import FormSection from "@/components/project-form/form-sections/FormSection";
import * as Form from "@radix-ui/react-form";
import StepperNavigation from "./StepperNavigation";
import { Separator } from "@radix-ui/themes";
import {
  notFound,
  redirect,
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Project from "@/types/project";
import { validateUUID } from "@/utils";
import { baseUrl } from "@/utils";

type Props = {
  steps: Step[];
  activeStepIndex: number;
};

function StepperContent({ steps, activeStepIndex }: Props) {
  const router = useRouter();
  const { userUUID, projectUUID } = useParams();
  const activeStep = steps[activeStepIndex];
  const [formAction, editFormData] = usePreloadedFormData(
    activeStep.onComplete, // server action
    activeStep.callback // callback URL
  );

  if (!projectUUID || !validateUUID(projectUUID as string)) {
    notFound();
  }

  return (
    <Form.Root action={formAction}>
      <FormSection
        title={activeStep.title}
        description={activeStep.description}
      >
        {cloneElement(activeStep.content as React.ReactElement, {
          editFormData,
        })}
      </FormSection>
      <StepperNavigation steps={steps} activeStepIndex={activeStepIndex} />
    </Form.Root>
  );
}

export default StepperContent;
