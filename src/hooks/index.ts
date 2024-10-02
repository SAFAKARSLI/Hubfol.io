'use client';

import { useRouter } from 'next/navigation';
import { act, useEffect, useState } from 'react';

type FormDataObject = {
  [key: string]: string | Blob | any[];
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
      if (Array.isArray(value)) {
        formDataLoadedByAction.append(key, JSON.stringify(value));
      } else formDataLoadedByAction.append(key, value);
    });
    await serverAction(formDataLoadedByAction);
    router.push(callbackUrl);
  };

  // Appends provided object to the FormDataObject state.
  const editFormData = (key: string, value: string | Blob) => {
    setFormData((prev) => {
      const existingValue = prev[key];
      if (Array.isArray(existingValue) && key === 'content') {
        return { ...prev, [key]: [...existingValue, value] };
      }
      // If the key exists and the value is not an array, convert it to an array
      else if (existingValue !== undefined && key === 'content') {
        return { ...prev, [key]: [existingValue, value] };
      }
      // If the key does not exist, simply set it with the new value
      return { ...prev, [key]: value };
    });
  };

  return [onFormAction, editFormData];
};
