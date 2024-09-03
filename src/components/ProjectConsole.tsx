'use client';
import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import Project from '@/types/project';
import * as Accordion from '@radix-ui/react-accordion';
import AccordionProjectItem from './AccordionProjectItem';
import { IconButton } from '@radix-ui/themes';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';

type Props = {
  project: Project;
};

function ProjectConsole({ project }: Props) {
  const [accordionValue, setAccordionValue] = useState('');

  useEffect(() => {
    if (project && project.projectUUID) {
      setAccordionValue(project.projectUUID);
    }
  }, []);

  return (
    <div className="xl:hidden absolute bottom-4 right-0 flex flex-col justify-center items-center">
      <IconButton
        variant="solid"
        color="violet"
        className="w-full rounded-t rounded-b-none h-[1rem]"
        size={'1'}
        onClick={() =>
          accordionValue
            ? setAccordionValue('')
            : setAccordionValue(project.projectUUID as string)
        }
      >
        {accordionValue ? <ChevronDownIcon /> : <ChevronUpIcon />}
      </IconButton>
      <div className=" bg-gray-1 w-[25rem] p-4 max-h-[50rem] border-x border-t border-violet-5">
        <Accordion.Root
          type="single"
          value={accordionValue}
          onValueChange={() => setAccordionValue(project.projectUUID as string)}
        >
          <div className="max-h-[44rem] ">
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
    </div>
  );
}

export default ProjectConsole;
