'use client';
import React, { useEffect, useState } from 'react';
import Project from '@/types/project';
import * as Accordion from '@radix-ui/react-accordion';
import AccordionProjectItem from './AccordionProjectItem';
import { Button, IconButton } from '@radix-ui/themes';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { preferredColorOptions } from '@/utils';

type Props = {
  project: Project;
};

function ProjectConsole({ project }: Props) {
  const [isConsoleOpen, setConsoleOpen] = useState(false);
  // useEffect(() => {
  //   setConsoleOpen(true);
  // }, []);

  const handleConsoleOpen = () => {
    setConsoleOpen(!isConsoleOpen);
  };

  return (
    <div key={project.uuid} className="z-10">
      <Accordion.Root
        type="single"
        value={isConsoleOpen ? project.uuid : ''}
        className={`xl:hidden w-[25rem] absolute right-0  
         -sm:w-full bottom-0  flex flex-col justify-end duration-300 overflow-hidden  rounded-t`}
      >
        <Accordion.Item value={project!.uuid!}>
          <Accordion.Trigger asChild>
            <Button
              color={preferredColorOptions.accentColor}
              className="rounded-t rounded-b-none h-[1.8rem] w-full"
              size={'1'}
              onClick={handleConsoleOpen}
            >
              {isConsoleOpen ? (
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
          <Accordion.Content className="bg-gray-1 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
            <Accordion.Root type="single" value={project.uuid} asChild>
              <div
                className={` bg-gray-1  border-x border-violet-a3 duration-300  `}
              >
                <AccordionProjectItem
                  uuid={project.uuid}
                  name={project.name}
                  tagline={project.tagline!}
                  iconLink={project.iconLink!}
                  sections={project.sections}
                  activeProjectId={project.uuid}
                  ownerId={project.ownerId}
                  url={project.url!}
                />
              </div>
            </Accordion.Root>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
      {/* <div
        className={`xl:hidden fixed left-0 top-0 right-0 bottom-0 bg-violet-a13 z-10 ${
          !isConsoleOpen && 'hidden'
        }`}
        onClick={() => setConsoleOpen(false)}
      /> */}
    </div>
  );
}

export default ProjectConsole;
