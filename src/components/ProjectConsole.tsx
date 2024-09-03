'use client';
import React, { useEffect } from 'react';
import ProjectCard from './ProjectCard';
import Project from '@/types/project';
import * as Accordion from '@radix-ui/react-accordion';
import AccordionProjectItem from './AccordionProjectItem';

type Props = {
  project: Project;
};

function ProjectConsole({ project }: Props) {
  const [accordionValue, setAccordionValue] = React.useState('');

  useEffect(() => {
    if (project && project.projectUUID) {
      setAccordionValue(project.projectUUID);
    }
  }, []);

  return (
    <div className="xl:hidden absolute bottom-4 right-0 bg-gray-3 rounded-t w-[25rem] p-4 max-h-[50rem] border border-gray-5">
      <Accordion.Root type="single" value={accordionValue}>
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
  );
}

export default ProjectConsole;
