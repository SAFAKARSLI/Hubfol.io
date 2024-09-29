'use client';
import { baseUrl } from '@/utils';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { Button, IconButton } from '@radix-ui/themes';
import { set } from 'lodash';
import { revalidatePath } from 'next/cache';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { act, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { Step } from './step';

type Props = {
  steps: Step[];
  activeStepIndex: number;
};

function StepperNavigation({ steps, activeStepIndex }: Props) {
  const router = useRouter();
  const formStatus = useFormStatus();
  const { userUUID, projectUUID } = useParams();
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="space-x-2 float-right mt-3">
      <Button
        color="gray"
        variant="soft"
        type="button"
        disabled={activeStepIndex == 0 || formStatus.pending}
        loading={loading}
        onClick={() => {
          setLoading(true);
          router.push(
            `${baseUrl}/u/${userUUID}/projects/${projectUUID}/${
              steps[activeStepIndex - 1].slug
            }`
          );
        }}
      >
        Previous
      </Button>
      <Button
        variant="solid"
        type="submit"
        disabled={loading}
        loading={formStatus.pending}
      >
        {activeStepIndex == steps.length - 1 ? (
          <>Submit Form</>
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
