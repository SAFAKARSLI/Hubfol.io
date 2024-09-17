'use client';

import { allowedIconTypes } from '@/utils';
import { Cross1Icon } from '@radix-ui/react-icons';
import React from 'react';
import * as Form from '@radix-ui/react-form';

type Props = {
  editFormData: (key: string, value: string | Blob) => void;
};

function FileInput({ editFormData }: Props) {
  const [icon, setIcon] = React.useState<string | null>('');

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

  return (
    <div>
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
            onMouseDown={() => setIcon('')}
          />
        </div>
      ) : (
        <Form.Control asChild>
          <input
            onChange={(e) => handleFileInput((e.target.files as FileList)[0])}
            type="file"
            className="w-full"
            name={'iconLink'}
          />
        </Form.Control>
      )}
    </div>
  );
}

export default FileInput;
