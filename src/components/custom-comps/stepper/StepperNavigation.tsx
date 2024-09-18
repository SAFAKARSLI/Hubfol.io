'use client';
import { Button } from '@radix-ui/themes';
import { revalidatePath } from 'next/cache';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { act } from 'react';

type Props = {
  maxStepNum: number;
  formRef: HTMLFormElement | null;
};

function StepperNavigation({ maxStepNum, formRef }: Props) {
  const activeStep = Number(useSearchParams().get('step'));
  const { userUUID } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const submitRef = React.useRef<HTMLButtonElement>(null);

  const handleNextSectionButtonClick = async () => {
    if (activeStep < maxStepNum) {
      await formRef?.requestSubmit(submitRef.current);
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
        type="submit"
        ref={submitRef}
        onClick={handleNextSectionButtonClick}
      >
        {activeStep == maxStepNum ? 'Submit Form' : 'Next Section'}
      </Button>
    </div>
  );
}

export default StepperNavigation;
