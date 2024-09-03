'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

import * as Accordion from '@radix-ui/react-accordion';

import Project from '@/types/project';
import AccordionProjectItem from './AccordionProjectItem';
import { Flex, ScrollArea } from '@radix-ui/themes';
import AddProjectButton from './AddProjectButton';
import ProjectListHeader from './ProjectListHeader';

type Props = {
  initialProjects: Project[];
  activeProjectId: string;
};

function AccordionProjectList({ initialProjects }: Props) {
  const { projectUUID, userUUID } = useParams<{
    projectUUID: string;
    userUUID: string;
  }>();
  const [accordionValue, setAccordionValue] = useState<string>('');
  const [projectList, setProjectList] = useState<Project[]>(initialProjects);
  const router = useRouter();

  useEffect(() => {
    if (projectUUID) {
      setAccordionValue(projectUUID);
    }
  });

  function renderProjects() {
    return projectList.map((p, i) => {
      return (
        <AccordionProjectItem
          key={i}
          projectUUID={p.projectUUID as string}
          title={p.title!}
          tagline={p.tagline!}
          iconLink={p.iconLink!}
          sections={p.sections!}
          activeProjectId={projectUUID}
          ownerId={p.ownerId!}
        />
      );
    });
  }

  function onChangeActiveProject(projectUUID: string) {
    router.push(`/users/${userUUID}/projects/${projectUUID}`);
  }

  return (
    <div className="h-[calc(100vh-6rem)] py-5 bg-gray-1 border-x border-b border-gray-4 w-[27rem] -2xl:w-[24rem] -xl:hidden">
      <ScrollArea
        type="auto"
        scrollbars="vertical"
        style={{ maxHeight: 'calc(100vh-6rem)' }}
      >
        <Accordion.Root
          type="single"
          onValueChange={onChangeActiveProject}
          value={accordionValue}
        >
          <Flex direction={'column'} className="gap-5 px-5">
            <ProjectListHeader projectCount={initialProjects.length} />
            {renderProjects()}
            <AddProjectButton
              userUUID={userUUID}
              updateProjects={setProjectList}
              projectList={projectList}
            />
          </Flex>
        </Accordion.Root>
      </ScrollArea>
    </div>
  );
}

export default AccordionProjectList;
