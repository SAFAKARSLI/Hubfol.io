'use client';
import React, { useEffect, useState } from 'react';
import { Button, DropdownMenu, IconButton, ScrollArea } from '@radix-ui/themes';
import { CardStackIcon } from '@radix-ui/react-icons';
import ProjectListHeader from './ProjectListHeader';
import AddProjectButton from './AddProjectButton';
import Project from '@/types/project';
import ProjectCard from './ProjectCard';

type Props = {
  projects: Project[];
  userUUID: string;
};

function HamburgerProjectMenu({ projects, userUUID }: Props) {
  const [open, setOpen] = useState(false);

  const renderProjects = () => {
    return projects.map((project: Project) => {
      return (
        <DropdownMenu.Item key={project.projectUUID} asChild>
          <ProjectCard project={project} userUUID={userUUID} />
        </DropdownMenu.Item>
      );
    });
  };

  return (
    <DropdownMenu.Root open={open}>
      <DropdownMenu.Trigger onClick={() => setOpen(true)}>
        <Button
          variant="soft"
          size={'3'}
          className="-xl:flex hidden text-xs"
          onScroll={() => {
            console.log('SCROLLLL');
          }}
        >
          <CardStackIcon /> <div className="-xs:hidden">Projects</div>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content onInteractOutside={() => setOpen(false)}>
        <div className="flex flex-col gap-2  my-2">
          <ProjectListHeader projectCount={projects.length} />
          <ScrollArea
            type="auto"
            style={{ maxHeight: '20rem' }}
            onClick={() => setOpen(false)}
          >
            {renderProjects()}
          </ScrollArea>
          <AddProjectButton
            userUUID={userUUID}
            onSubmit={() => setOpen(false)}
          />
        </div>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default HamburgerProjectMenu;
