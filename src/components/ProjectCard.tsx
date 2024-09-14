'use client';
import Project from '@/types/project';
import { defaultIconLink, preferredColorOptions } from '@/utils';
import { Heading, Text } from '@radix-ui/themes';
import { useParams, useRouter } from 'next/navigation';
import React, { forwardRef } from 'react';

type Props = {
  project: Project;
  userUUID?: string;
};

const ProjectCard = forwardRef<HTMLDivElement, Props>(
  ({ project, userUUID }, ref) => {
    const params = useParams<{ projectUUID: string }>();
    const router = useRouter();
    return (
      <div
        ref={ref}
        className={`flex h-[4rem] justify-start items-center gap-4 border border-gray-5 rounded p-4 my-2  cursor-pointer 
      ${
        params.projectUUID === project.uuid
          ? `bg-${preferredColorOptions.accentColor}-4 hover:bg-${preferredColorOptions.accentColor}-4`
          : 'hover:bg-gray-4'
      }`}
        onClick={() => {
          router.push(`/users/${userUUID}/projects/${project.uuid}`);
        }}
      >
        <img
          src={
            (project.iconLink as string)
              ? (project.iconLink as string)
              : defaultIconLink
          }
          alt={project.title!}
          style={{ objectFit: 'contain' }}
          className="w-[1.8rem] h-[1.8rem]"
        />
        <div className="flex flex-col ">
          <Heading className="text-base">{project.title}</Heading>
          <Text className="text-xs ">{project.tagline}</Text>
        </div>
      </div>
    );
  }
);

export default ProjectCard;
