import React from 'react';
import { Heading, Text } from '@radix-ui/themes';
import FormInput from '@/components/FormInput';
import Project from '@/types/project';
import { Cross1Icon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { allowedIconTypes } from '@/utils';
import { deleteIcon, uploadIcon } from '@/app/actions';
// import { project, setProject } from '@/store/project'

type Props = {
  project: Project;
  setProject: (project: Project) => void;
};

function ProjectInfoForm({ project, setProject }: Props) {
  console.log(project);
  const handleRemoveIcon = async () => {
    if (project.iconLink) {
      setProject({ ...project, iconLink: '' });
    }
  };

  const handleFileInput = (file: File) => {
    if (!allowedIconTypes.includes(file.type)) {
      throw new Error('Invalid file type');
    }

    const formData = new FormData();
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      const arrayBuffer = reader.result;
      const blob = new Blob([arrayBuffer as ArrayBuffer], {
        type: 'application/octet-stream',
      });
      formData.append('iconLink', blob);
      const s3Link = await uploadIcon(formData);
      setProject({ ...project, iconLink: s3Link });
    };
  };

  return (
    <div className="flex flex-col gap-4 my-5">
      <Text size="3">
        Enter the project information below. All of the fields are required
        <b className="text-red-500">*</b>. You can edit this information later.
      </Text>

      <FormInput
        label="Project Name"
        name="title"
        placerholder="Enter your project name"
        type="text"
        value={project.title as string}
        onChange={(e) => {
          setProject({ ...project, title: e.target.value });
        }}
      />
      <FormInput
        label="Tagline"
        name="tagline"
        placerholder="Describe your project in one sentence"
        type="text"
        value={project.tagline as string}
        onChange={(e) =>
          setProject({
            ...project,
            tagline: e.target.value,
          })
        }
      />

      <FormInput
        label="URL"
        name="url"
        placerholder="Enter the project URL"
        type="text"
        value={project.url as string}
        onChange={(e) => setProject({ ...project, url: e.target.value })}
      />
      <label>
        <Heading size="3" mb="2">
          Project Icon
        </Heading>
        {project.iconLink ? (
          <div className="flex items-center gap-1">
            <div className="h-[3.5rem] w-[3.5rem] relative">
              <Image
                src={project.iconLink as string}
                alt="project icon"
                fill
                sizes="100px"
                style={{ objectFit: 'contain' }}
                className="bg-gray-1 border border-gray-5 w-[4rem] h-[4rem] rounded p-2"
              />
            </div>
            <Cross1Icon
              className="w-6 h-6 hover:bg-gray-5 text-gray-300 rounded-sm p-1 cursor-pointer"
              onMouseDown={handleRemoveIcon}
            />
          </div>
        ) : (
          <input
            onChange={(e) => handleFileInput((e.target.files as FileList)[0])}
            type="file"
          />
        )}
      </label>
    </div>
  );
}

export default ProjectInfoForm;
