import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

import * as Accordion from '@radix-ui/react-accordion';

import AccordionProjectItem from './AccordionProjectItem';
import Project from '@/types/project';

type Props = {
  initialProjects: Project[];
  activeProjectId: string;
};

function AccordionProjectList({ initialProjects, activeProjectId }: Props) {
  return (
    <Accordion.Root
      type="single"
      value={activeProjectId ?? 'NO_ACTIVE_PROJECT'}
      asChild
    >
      <div className="px-5 flex flex-col gap-4">
        {initialProjects.map((p, i) => {
          return (
            <AccordionProjectItem
              key={i}
              activeProjectId={activeProjectId}
              project={p}
            />
          );
        })}
      </div>
    </Accordion.Root>
  );
}

export default AccordionProjectList;
