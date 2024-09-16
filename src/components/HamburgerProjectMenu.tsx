'use client';
import React, { useState } from 'react';
import { Button, DropdownMenu, IconButton, ScrollArea } from '@radix-ui/themes';
import { CardStackIcon } from '@radix-ui/react-icons';
import ProjectListHeader from './ProjectListHeader';
import AddProjectButton from './AddProjectButton';
import Project from '@/types/project';
import * as Accordion from '@radix-ui/react-accordion';
import AccordionProjectItem from './AccordionProjectItem';
import { useRouter } from 'next/navigation';

type Props = {
  projects: Project[];
  userUUID: string;
};

function HamburgerProjectMenu({ projects, userUUID }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleHamburgerProjectClick = (p: Project) => {
    setOpen(false);
    router.push(`/users/${userUUID}/projects/${p.uuid}`);
  };

  return (
    <DropdownMenu.Root open={open}>
      <DropdownMenu.Trigger onClick={() => setOpen(true)}>
        <Button variant="soft" size={'3'} className="-xl:flex hidden text-xs">
          <CardStackIcon /> <div className="-xs:hidden">Projects</div>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content onInteractOutside={() => setOpen(false)}>
        <div className=" max-w-[25rem] max-h-[50dvh] -sm:w-[15rem] flex flex-col gap-2 ">
          <ProjectListHeader projectCount={projects.length} />
          <Accordion.Root type="single" asChild value="123">
            <div>
              {projects.map((p, i) => {
                return (
                  <div key={i} onClick={() => handleHamburgerProjectClick(p)}>
                    <AccordionProjectItem
                      uuid={p.uuid as string}
                      name={p.name!}
                      tagline={p.tagline!}
                      iconLink={p.iconLink!}
                      sections={p.sections!}
                      activeProjectId={''}
                      ownerId={p.ownerId!}
                      url={p.url!}
                    />
                  </div>
                );
              })}
            </div>
          </Accordion.Root>
          <AddProjectButton variant="solid" />
        </div>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default HamburgerProjectMenu;
