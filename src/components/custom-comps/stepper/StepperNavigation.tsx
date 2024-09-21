'use client';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { Button, IconButton } from '@radix-ui/themes';
import { set } from 'lodash';
import { revalidatePath } from 'next/cache';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { act, useEffect } from 'react';
import { useFormStatus } from 'react-dom';

type Props = {
  maxStepNum: number;
};

function StepperNavigation({ maxStepNum }: Props) {
  const activeStep = Number(useSearchParams().get('step'));
  const router = useRouter();
  const pathname = usePathname();
  const formStatus = useFormStatus();

  return (
    <div className="space-x-2 float-right mt-3">
      <Button
        color="gray"
        variant="soft"
        type="button"
        disabled={activeStep == 0 || formStatus.pending}
        onClick={() => router.replace(`${pathname}?step=${activeStep - 1}`)}
      >
        Back
      </Button>
      <Button variant="solid" type="submit" loading={formStatus.pending}>
        {activeStep == maxStepNum ? (
          <div>Submit Form</div>
        ) : (
          <>
            Next
            <ArrowRightIcon />
          </>
        )}
      </Button>
    </div>
  );
}

export default StepperNavigation;
