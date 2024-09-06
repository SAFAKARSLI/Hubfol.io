'use client';
import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import Project from '@/types/project';
import * as Accordion from '@radix-ui/react-accordion';
import AccordionProjectItem from './AccordionProjectItem';
import { IconButton } from '@radix-ui/themes';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { preferredColorOptions } from '@/utils';

type Props = {
  project: Project;
};

function ProjectConsole({ project }: Props) {
  const [isConsoleOpen, setConsoleOpen] = useState(false);

  return (
    <div>
      <div
        className={`xl:hidden w-[25rem] absolute  right-0  
       -sm:w-full bottom-0 h-1/2 flex flex-col justify-end duration-300 z-50 `}
      >
        <IconButton
          color={preferredColorOptions.accentColor}
          className=" w-full rounded-t rounded-b-none h-[1.5rem] flex-none"
          size={'1'}
          onClick={() => setConsoleOpen(!isConsoleOpen)}
        >
          {isConsoleOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
        </IconButton>

        <Accordion.Root type="single" value={project.projectUUID} asChild>
          <div
            className={`${
              isConsoleOpen ? 'h-[50vh]' : 'h-0'
            }  bg-gray-1  w-full border-x border-t duration-300 border-violet-5 `}
          >
            {project && isConsoleOpen && (
              <AccordionProjectItem
                projectUUID={project.projectUUID as string}
                title={project.title!}
                tagline={project.tagline!}
                iconLink={project.iconLink!}
                sections={project.sections!}
                activeProjectId={project.projectUUID!}
                ownerId={project.ownerId!}
              />
            )}
          </div>
        </Accordion.Root>
      </div>
      <div
        className={` fixed left-0 top-0 right-0 bottom-0 bg-violet-a13 z-10 ${
          !isConsoleOpen && 'hidden'
        }`}
        onClick={() => setConsoleOpen(false)}
      />
    </div>
  );
}

export default ProjectConsole;
