'use client';
import React, { useEffect, useState } from 'react';
import Project from '@/types/project';
import * as Accordion from '@radix-ui/react-accordion';
import AccordionProjectItem from './AccordionProjectItem';
import { Button, IconButton } from '@radix-ui/themes';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { preferredColorOptions } from '@/utils';

type Props = {
  project?: Project;
};

function ProjectConsole({ project }: Props) {
  const [isConsoleOpen, setConsoleOpen] = useState(false);

  // useEffect(() => {
  //   setConsoleOpen(true);
  // }, []);

  return (
    <div key={project?.projectUUID}>
      <div
        className={`xl:hidden w-[25rem] absolute right-0  
         -sm:w-full bottom-0  flex flex-col justify-end duration-300 z-50`}
      >
        <Button
          color={preferredColorOptions.accentColor}
          className=" w-full rounded-t rounded-b-none h-[1.8rem] flex-none"
          size={'1'}
          onClick={() => setConsoleOpen(!isConsoleOpen)}
        >
          {isConsoleOpen ? (
            <div className="flex gap-1 items-center h-full justify-center w-full">
              <ChevronDownIcon /> Close Console
            </div>
          ) : (
            <div className="flex gap-1 items-center h-full justify-center w-full ">
              <ChevronUpIcon /> View Project Info
            </div>
          )}
        </Button>

        <Accordion.Root type="single" value={project!.projectUUID} asChild>
          <div
            className={`${
              isConsoleOpen ? 'h-[50vh]' : 'h-0'
            } h-0 bg-gray-1  w-full border-x border-t duration-300 border-violet-5 `}
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
                url={project.url!}
              />
            )}
          </div>
        </Accordion.Root>
      </div>
      <div
        className={`xl:hidden fixed left-0 top-0 right-0 bottom-0 bg-violet-a13 z-10 ${
          !isConsoleOpen && 'hidden'
        }`}
        onClick={() => setConsoleOpen(false)}
      />
    </div>
  );
}

export default ProjectConsole;
