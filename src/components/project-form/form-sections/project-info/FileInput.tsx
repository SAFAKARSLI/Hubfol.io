'use client';

import { allowedIconTypes } from '@/utils';
import { Cross1Icon } from '@radix-ui/react-icons';
import React from 'react';

type Props = {};

function FileInput({}: Props) {
  const [icon, setIcon] = React.useState<string | null>('');

  const handleFileInput = (file: File) => {
    if (!allowedIconTypes.includes(file.type)) {
      throw new Error('Invalid file type');
    }

    const formData = new FormData();
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      setIcon(URL.createObjectURL(file));

      // const arrayBuffer = reader.result
      // const blob = new Blob([arrayBuffer as ArrayBuffer], {
      //   type: 'application/octet-stream'
      // })
      // formData.append('iconLink', blob)
      // const s3Link = await uploadIcon(formData)
      // setProject({ ...project, iconLink: s3Link })
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
        <input
          onChange={(e) => handleFileInput((e.target.files as FileList)[0])}
          type="file"
          className="w-full"
        />
      )}
    </div>
  );
}

export default FileInput;
