'use client';
import Project from '@/types/project';
import { preferredColorOptions } from '@/utils';
import { Heading, Text } from '@radix-ui/themes';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  project: Project;
  userUUID?: string;
};

function ProjectCard({ project, userUUID }: Props) {
  const params = useParams<{ projectUUID: string }>();
  const router = useRouter();
  return (
    <div
      className={`flex h-[4rem] justify-start items-center gap-4 border border-gray-5 rounded p-4 my-2  cursor-pointer 
      ${
        params.projectUUID === project.projectUUID
          ? `bg-${preferredColorOptions.accentColor}-4 hover:bg-${preferredColorOptions.accentColor}-4`
          : 'hover:bg-gray-4'
      }`}
      onClick={() =>
        router.push(`/users/${userUUID}/projects/${project.projectUUID}`)
      }
    >
      <div className="relative h-8 w-8">
        <Image
          fill
          sizes="50px"
          src={project.iconLink as string}
          alt={project.title!}
          style={{ objectFit: 'contain' }}
          className="w-[1.2rem] h-[1.2rem] rounded-lg"
        />
      </div>
      <div className="flex flex-col ">
        <Heading className="text-base">{project.title}</Heading>
        <Text className="text-xs ">{project.tagline}</Text>
      </div>
    </div>
  );
}

export default ProjectCard;
