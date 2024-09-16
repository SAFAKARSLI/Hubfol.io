'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

import * as Accordion from '@radix-ui/react-accordion';

import AccordionProjectItem from './AccordionProjectItem';
import Project from '@/types/project';

type Props = {
  initialProjects: Project[];
};

function AccordionProjectList({ initialProjects }: Props) {
  const { projectUUID, userUUID } = useParams<{
    projectUUID: string;
    userUUID: string;
  }>();
  const [accordionValue, setAccordionValue] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    if (projectUUID) setAccordionValue(projectUUID);
  }, []);

  function onChangeActiveProject(projectUUID: string) {
    router.push(`/u/${userUUID}/projects/${projectUUID}`);
  }

  return (
    <Accordion.Root
      type="single"
      onValueChange={onChangeActiveProject}
      value={accordionValue}
      asChild
    >
      <div className="px-5 flex flex-col gap-4">
        {initialProjects.map((p, i) => {
          return (
            <AccordionProjectItem
              key={i}
              uuid={p.uuid as string}
              name={p.name!}
              tagline={p.tagline!}
              iconLink={p.iconLink!}
              sections={p.sections!}
              activeProjectId={projectUUID}
              ownerId={p.ownerId!}
              url={p.url!}
            />
          );
        })}
      </div>
    </Accordion.Root>
  );
}

export default AccordionProjectList;
