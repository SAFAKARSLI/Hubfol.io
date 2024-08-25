import React, { useEffect, useState } from 'react';

import * as Accordion from '@radix-ui/react-accordion';
import ProjectSubsection from './ProjectSubsection';
import Divider from './subsections/Divider';
import Project from '@/models/project';

import { Box, DropdownMenu, IconButton, Text } from '@radix-ui/themes';

import Image from 'next/image';

import { Section } from '@/models/project';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { getProject } from '@/app/actions';

interface ProjectCardProps {
  _id: string;
  title: string;
  tagline: string;
  iconLink: string | ArrayBuffer;
  sections: Section[] | null;
  activeProjectId: string;
}

const ProjectCard = ({
  _id,
  title,
  tagline,
  iconLink,
  sections,
  activeProjectId,
}: ProjectCardProps) => {
  // const [properties, setProperties] = useState<any>({ _id: _id, title: title, tagline: tagline, iconLink: iconLink, content: content });

  // const fetchProject = async () => {
  //   const project = (await fetch("http://localhost:3000/api/projects/"+_id, {cache: "no-cache"}).then((project) => project.json())) as Project;
  //   setProperties(project);
  // }
  return (
    <Accordion.Item value={_id} asChild>
      <Box
        className="
      mx-5
      mb-5
      rounded
      border
      border-gray-4
      overflow-hidden"
      >
        <Accordion.Trigger asChild>
          <div
            className={`flex py-4 px-8 
          bg-gray-1 data-[state=open]:bg-gray-2 hover:bg-gray-2
          data-[state=closed]:cursor-pointer `}
          >
            <div className="flex justify-between w-full items-center gap-x-8">
              <Image
                width={'40'}
                height="40"
                alt={`${title}-icon`}
                src={iconLink as string}
              />

              <div className="gap-y-1 flex-1 flex flex-col">
                <Text weight={'bold'} size={'3'}>
                  {title}
                </Text>
                <Text size={'1'}>{tagline}</Text>
              </div>
            </div>
            {_id === activeProjectId && (
              <div className="h-full flex-none">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <IconButton variant="ghost" color="gray" asChild>
                      <DotsHorizontalIcon />
                    </IconButton>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Item onSelect={() => console.log('Edit')}>
                      Edit
                    </DropdownMenu.Item>
                    <DropdownMenu.Item onSelect={() => console.log('Delete')}>
                      Delete
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </div>
            )}
          </div>
        </Accordion.Trigger>

        <Accordion.Content asChild>
          <div className="project-content w-full bg-gray-1 text-hubfolio-subtext rounded-b data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden px-6 ">
            {sections?.map((s, i) => {
              return (
                <div key={i}>
                  <ProjectSubsection
                    title={s.title}
                    contentType={s.contentType}
                    content={s.content}
                  />
                  {i == sections.length - 1 ? null : <Divider />}
                </div>
              );
            })}
          </div>
        </Accordion.Content>
      </Box>
    </Accordion.Item>
  );
};

export default ProjectCard;
