'use client';

import { allowedIconTypes, baseUrl } from '@/utils';
import { Cross1Icon, FileIcon, UploadIcon } from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react';
import * as Form from '@radix-ui/react-form';
import '@/app/globals.css';
import { IconButton, Spinner } from '@radix-ui/themes';

type Props = {
  editFormData: (key: string, value: string | Blob) => void;
  formDataSlug: string;
  defaultValue?: string;
  accept: string;
  bucketName: string;
};

function FileInput({
  bucketName,
  editFormData,
  defaultValue,
  accept,
  formDataSlug,
}: Props) {
  const [file, setFile] = useState<File | null>();
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchFileFromS3 = async () => {
      if (defaultValue?.length! > 0) {
        const response = await fetch(
          baseUrl +
            '/api/static-file-provider?key=' +
            defaultValue +
            '&bucketName=' +
            bucketName
        );
        console.log(response);
        const buffer = await response.arrayBuffer();
        const fileName = response.headers.get('Content-Disposition')
          ? response.headers.get('Content-Disposition')?.split('=')[1]
          : defaultValue + '.pdf';
        const file = new File([buffer], fileName as string, {
          type: 'application/pdf',
        });
        setFile(file);
      }
    };
    fetchFileFromS3();
  }, []);

  const handleFileInput = (file: File) => {
    // const reader = new FileReader();
    // reader.readAsArrayBuffer(file);
    // reader.onload = () => {
    //   const arrayBuffer = reader.result;
    //   const blob = new Blob([arrayBuffer as ArrayBuffer], {
    //     type: 'application/octet-stream',
    //   });

    //   editFormData(formDataSlug, blob);
    //   setIcon(URL.createObjectURL(file));
    // };
    setFile(file);
    editFormData(formDataSlug, file);
  };

  useEffect(() => {
    editFormData(formDataSlug, defaultValue!);
  }, []);

  return (
    <div className="mt-1">
      {file ? (
        accept != '.pdf' ? (
          <div className="flex items-center gap-1">
            <div className="h-[4rem] w-[4rem] relative">
              <img
                src={URL.createObjectURL(file)}
                alt="project-icon"
                width={10}
                height={10}
                style={{ objectFit: 'contain' }}
                className="bg-gray-1 border border-gray-5 w-full h-full rounded p-2"
              />
            </div>
            <Cross1Icon
              className="w-6 h-6 hover:bg-gray-5 text-gray-300 rounded-md p-1 cursor-pointer"
              onMouseDown={() => {
                setFile(null);
                // editFormData(formDataSlug, new File([], ''));
              }}
            />
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <div className=" relative bg-gray-1 border border-gray-5 rounded p-2">
              <a
                href={URL.createObjectURL(file)}
                target="_blank"
                rel="noreferrer"
                className="flex gap-1 items-center hover:text-violet-11"
              >
                <FileIcon className="h-5 w-5" />
                <span className="text-sm">{file.name}</span>
              </a>
            </div>
            <Cross1Icon
              className="w-6 h-6 hover:bg-gray-5 text-gray-300 rounded-md p-1 cursor-pointer"
              onMouseDown={() => {
                setFile(null);
                // editFormData(formDataSlug, new File([], ''));
              }}
            />
          </div>
        )
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
              accept={accept}
              className="hidden"
              name={formDataSlug}
            />
          </>
        </Form.Control>
      )}
    </div>
  );
}

export default FileInput;
