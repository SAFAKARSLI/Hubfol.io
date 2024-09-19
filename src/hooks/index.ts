'use client';

import { useState } from 'react';

type FormDataObject = {
  [key: string]: string | Blob;
};

export const usePreloadedFormData = (
  serverAction: (formData: FormData) => any
): [
  (formData: FormData) => Promise<any>,
  (key: string, value: string | Blob) => void,
  any
] => {
  const [formData, setFormData] = useState<FormDataObject>({});
  const [actionResponse, setActionResponse] = useState<any>([]);

  const onFormAction = async (formDataLoadedByAction: FormData) => {
    Object.entries(formData).forEach(([key, value]) => {
      formDataLoadedByAction.append(key, value);
    });
    const response = await serverAction(formDataLoadedByAction);
    setActionResponse([...actionResponse, response]);
  };

  // Appends provided object to the FormDataObject state.
  const editFormData = (key: string, value: string | Blob) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return [onFormAction, editFormData, actionResponse];
};
