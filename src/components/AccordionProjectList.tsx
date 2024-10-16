'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

import * as Accordion from '@radix-ui/react-accordion';

import AccordionProjectItem from './AccordionProjectItem';
import Project from '@/types/project';
import { Separator } from '@radix-ui/themes';

type Props = {
  initialProjects: Project[];
};

function AccordionProjectList({ initialProjects }: Props) {
  const { projectSlug, username } = useParams();
  const [accordionValue, setAccordionValue] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    if (projectSlug) setAccordionValue(projectSlug as string);
  }, []);

  function onChangeActiveProject(slug: string) {
    router.push(`/u/${username}/projects/${slug}`);
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
              activeProjectId={projectSlug as string}
              project={p}
            />
          );
        })}
      </div>
    </Accordion.Root>
  );
}

export default AccordionProjectList;
