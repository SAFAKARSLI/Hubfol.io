'use client';

import { allowedIconTypes } from '@/utils';
import { Cross1Icon, UploadIcon } from '@radix-ui/react-icons';
import React, { useEffect } from 'react';
import * as Form from '@radix-ui/react-form';
import '@/app/globals.css';
import { IconButton } from '@radix-ui/themes';

type Props = {
  editFormData: (key: string, value: string | Blob) => void;
  defaultValue?: string;
};

function FileInput({ editFormData, defaultValue = '' }: Props) {
  const [icon, setIcon] = React.useState<string | Blob>(defaultValue);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileInput = (file: File) => {
    if (!allowedIconTypes.includes(file.type)) {
      throw new Error('Invalid file type');
    }

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const arrayBuffer = reader.result;
      const blob = new Blob([arrayBuffer as ArrayBuffer], {
        type: 'application/octet-stream',
      });
      editFormData('iconLink', blob);
      setIcon(URL.createObjectURL(file));
    };
  };

  useEffect(() => {
    editFormData('iconLink', defaultValue);
  }, []);

  return (
    <div className="mt-1">
      {icon ? (
        <div className="flex items-center gap-1">
          <div className="h-[3.5rem] w-[3.5rem] relative">
            <img
              src={icon as string}
              alt="project icon"
              sizes="100px"
              style={{ objectFit: 'contain' }}
              className="bg-gray-1 border border-gray-5 w-full h-full rounded p-2"
            />
          </div>
          <Cross1Icon
            className="w-6 h-6 hover:bg-gray-5 text-gray-300 rounded-sm p-1 cursor-pointer"
            onMouseDown={() => {
              setIcon('');
              editFormData('iconLink', new File([], ''));
            }}
          />
        </div>
      ) : (
        <Form.Control asChild>
          <>
            <IconButton
              variant="surface"
              type="button"
              size={'4'}
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadIcon className="h-5 w-5" />
            </IconButton>
            <input
              ref={fileInputRef}
              onChange={(e) => handleFileInput((e.target.files as FileList)[0])}
              type="file"
              className="hidden"
              name={'iconLink'}
            />
          </>
        </Form.Control>
      )}
    </div>
  );
}

export default FileInput;
