'use client';
import { Button } from '@radix-ui/themes';
import { revalidatePath } from 'next/cache';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { act } from 'react';

type Props = {
  maxStepNum: number;
  formRef: React.RefObject<HTMLFormElement>;
};

function StepperNavigation({ maxStepNum, formRef }: Props) {
  const activeStep = Number(useSearchParams().get('step'));
  const { userUUID } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const submitRef = React.useRef<HTMLButtonElement>(null);

  const handleNextSectionButtonClick = () => {
    if (activeStep < maxStepNum) {
      formRef?.current!.requestSubmit();
      router.push(`${pathname}?step=${activeStep + 1}`);
    } else {
      router.push(`/u/${userUUID}/projects`);
    }
  };

  return (
    <div className="space-x-2 float-right mt-3">
      <Button
        color="gray"
        variant="soft"
        disabled={activeStep == 0}
        onClick={() => router.push(`${pathname}?step=${activeStep - 1}`)}
      >
        Back
      </Button>
      <Button
        variant="solid"
        type="button"
        ref={submitRef}
        onClick={handleNextSectionButtonClick}
      >
        {activeStep == maxStepNum ? 'Submit Form' : 'Next Section'}
      </Button>
    </div>
  );
}

export default StepperNavigation;
