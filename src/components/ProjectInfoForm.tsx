import React from 'react';
import { Heading, Text } from '@radix-ui/themes';
import FormInput from '@/components/FormInput';
import Project from '@/types/project';
import { CrossCircledIcon } from '@radix-ui/react-icons';
// import { project, setProject } from '@/store/project'

type Props = {
  project: Project;
  setProject: (project: Project) => void;
};

function ProjectInfoForm({ project, setProject }: Props) {
  const handleFileInput = (file: File) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const arrayBuffer = reader.result;
      setProject({ ...project, iconLink: arrayBuffer! });
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
        <Heading size="4" mb="2">
          Project Icon
        </Heading>
        {project.iconLink ? (
          <div>
            <img
              src={project.iconLink as string}
              alt="project icon"
              width="full"
              height="full"
              className="bg-gray-1 border border-gray-5 w-[4rem] h-[4rem] rounded p-2"
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
