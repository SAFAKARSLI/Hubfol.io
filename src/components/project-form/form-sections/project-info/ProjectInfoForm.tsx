'use client';
import React from 'react';
import { Heading, Text } from '@radix-ui/themes';
import FormInput from '@/components/project-form/FormInput';
import Project from '@/types/project';
import { Cross1Icon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { allowedIconTypes } from '@/utils';
import { uploadIcon } from '@/app/actions';
import * as Form from '@radix-ui/react-form';

type Props = {
  initialValues?: Project;
};

function ProjectInfoForm({ initialValues: project }: Props) {
  const [icon, setIcon] = React.useState<string>('');

  const handleFileInput = (file: File) => {
    if (!allowedIconTypes.includes(file.type)) {
      throw new Error('Invalid file type');
    }

    const formData = new FormData();
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      setIcon(URL.createObjectURL(file));

      // const arrayBuffer = reader.result;
      // const blob = new Blob([arrayBuffer as ArrayBuffer], {
      //   type: 'application/octet-stream',
      // });
      // formData.append('iconLink', blob);
      // const s3Link = await uploadIcon(formData);
      // setProject({ ...project, iconLink: s3Link });
    };
  };

  return (
    <div className="flex flex-col gap-4 my-5">
      <FormInput
        label="Title"
        name="title"
        placerholder="Enter your project name"
        message="Please enter a valid project name"
        type="text"
        defaultValue={project?.title}
      />
      <FormInput
        label="Tagline"
        name="tagline"
        placerholder="Describe your project in one sentence"
        type="text"
        defaultValue={project?.tagline}
      />

      <FormInput
        label="URL"
        name="url"
        placerholder="Enter the project URL"
        type="text"
        defaultValue={project?.url}
      />
      <label>
        <Heading size="3" mb="2">
          Project Icon
        </Heading>
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
      </label>
    </div>
  );
}

export default ProjectInfoForm;
