'use client';

import { useRouter } from 'next/navigation';
import { act, useEffect, useState } from 'react';

type FormDataObject = {
  [key: string]: string | Blob;
};

export const usePreloadedFormData = (
  serverAction: (formData: FormData) => any,
  callbackUrl: string
): [
  (formData: FormData) => Promise<any>,
  (key: string, value: string | Blob) => void
] => {
  const [formData, setFormData] = useState<FormDataObject>({});
  const router = useRouter();

  const onFormAction = async (formDataLoadedByAction: FormData) => {
    Object.entries(formData).forEach(([key, value]) => {
      formDataLoadedByAction.append(key, value);
    });
    await serverAction(formDataLoadedByAction);
    router.push(callbackUrl);
  };

  // Appends provided object to the FormDataObject state.
  const editFormData = (key: string, value: string | Blob) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return [onFormAction, editFormData];
};
