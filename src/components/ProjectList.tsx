'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

import * as Accordion from '@radix-ui/react-accordion';

import Project from '@/types/project';
import ProjectCard from './ProjectCard';
import { Box, Flex, ScrollArea } from '@radix-ui/themes';
import AddProjectButton from './AddProjectButton';
import ProjectListHeader from './ProjectListHeader';

type Props = {
  initialProjects: Project[];
  activeProjectId: string;
};

function ProjectList({ initialProjects }: Props) {
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
        <ProjectCard
          key={i}
          projectUUID={p.projectUUID as string}
          title={p.title!}
          tagline={p.tagline!}
          iconLink={p.iconLink!}
          sections={p.sections!}
          activeProjectId={projectUUID}
        />
      );
    });
  }

  function onChangeActiveProject(projectUUID: string) {
    router.push(`/users/${userUUID}/projects/${projectUUID}`);
  }

  return (
    <Box
      width={'27rem'}
      minWidth={'27rem'}
      py={'5'}
      className="h-[calc(100vh-6rem)] bg-gray-1 border-x border-b border-gray-4 "
    >
      <ScrollArea
        type="auto"
        scrollbars="vertical"
        className="w-[27rem] min-w-[27rem]"
        style={{ maxHeight: 'calc(100vh-6rem)' }}
      >
        <Accordion.Root
          type="single"
          onValueChange={onChangeActiveProject}
          value={accordionValue}
        >
          <Flex direction={'column'}>
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
    </Box>
  );
}

export default ProjectList;
