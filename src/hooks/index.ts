'use client';

import { act, useEffect, useState } from 'react';

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
  const [actionResponse, setActionResponse] = useState({});
  const [formData, setFormData] = useState<FormDataObject>({});

  const onFormAction = async (formDataLoadedByAction: FormData) => {
    console.log(formData);
    Object.entries(formData).forEach(([key, value]) => {
      formDataLoadedByAction.append(key, value);
    });

    const response = await serverAction(formDataLoadedByAction);
    setActionResponse(response);
  };

  // Appends provided object to the FormDataObject state.
  const editFormData = (key: string, value: string | Blob) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return [onFormAction, editFormData, actionResponse];
};
