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
  const [isConsoleOpen, setConsoleOpen] = useState(true);

  return (
    <div
      className={`xl:hidden w-[25rem] absolute  right-0  
       -sm:w-full bottom-0 h-1/2 flex flex-col justify-end max-h-[50vh]`}
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
            !isConsoleOpen && 'hidden'
          }  bg-gray-1 w-full border-x border-t border-violet-5 `}
        >
          {project && (
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
  );
}

export default ProjectConsole;
