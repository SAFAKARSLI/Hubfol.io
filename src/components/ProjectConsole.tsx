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
  const [isConsoleOpen, setConsoleOpen] = useState('CLOSED');

  // useEffect(() => {
  //   setConsoleOpen(true);
  // }, []);

  const handleConsoleOpen = () => {
    setConsoleOpen(
      isConsoleOpen === 'CLOSED' ? project?.projectUUID! : 'CLOSED'
    );
  };

  return (
    <div key={project?.projectUUID}>
      <Accordion.Root
        type="single"
        value={isConsoleOpen}
        className={`xl:hidden w-[25rem] absolute right-0  
         -sm:w-full bottom-0  flex flex-col justify-end duration-300 z-50 overflow-hidden  rounded-t`}
      >
        <Accordion.Item value={project!.projectUUID!}>
          <Accordion.Trigger asChild>
            <Button
              color={preferredColorOptions.accentColor}
              className="rounded-t rounded-b-none h-[1.8rem] w-full"
              size={'1'}
              onClick={handleConsoleOpen}
            >
              {isConsoleOpen != 'CLOSED' ? (
                <div className="flex gap-1 m-auto ">
                  <ChevronDownIcon /> Close Console
                </div>
              ) : (
                <div className="flex gap-1 m-auto">
                  <ChevronUpIcon /> View Project Info
                </div>
              )}
            </Button>
          </Accordion.Trigger>
          <Accordion.Content className="bg-gray-1 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden z-50">
            <Accordion.Root type="single" value={project!.projectUUID} asChild>
              <div
                className={` bg-gray-1  border-x border-violet-a3 duration-300  `}
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
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
      <div
        className={`xl:hidden fixed left-0 top-0 right-0 bottom-0 bg-violet-a13 z-10 ${
          isConsoleOpen == 'CLOSED' && 'hidden'
        }`}
        onClick={() => setConsoleOpen('CLOSED')}
      />
    </div>
  );
}

export default ProjectConsole;
