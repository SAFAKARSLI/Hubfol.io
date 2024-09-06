'use client';
import * as Accordion from '@radix-ui/react-accordion';
import { Box, Text, Heading, ScrollArea } from '@radix-ui/themes';
import Image from 'next/image';

import Project, { Section } from '@/types/project';

import ProjectSubsection from './ProjectSubsection';
import Divider from './subsections/Divider';
import ProjectMenu from './ProjectMenu';
import { use, useEffect, useRef } from 'react';

interface AccordionProjectItemProps {
  projectUUID: string;
  title: string;
  tagline: string;
  iconLink: string | ArrayBuffer;
  sections: Section[] | null;
  activeProjectId: string;
  ownerId: string;
}

const AccordionProjectItem = ({
  projectUUID,
  title,
  tagline,
  iconLink,
  sections,
  activeProjectId,
  ownerId,
}: AccordionProjectItemProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeProjectId === projectUUID) {
      cardRef.current?.scrollIntoView({
        behavior: 'instant',
        block: 'start',
        inline: 'nearest',
      });
    }
  }, [activeProjectId, projectUUID]);
  return (
    <Accordion.Item value={projectUUID} asChild>
      <div className="rounded border border-gray-4 overflow-hidden data-[state=open]:shadow-gray-3 shadow-md ">
        <Accordion.Trigger asChild>
          <div
            className={`flex py-3 px-6 
          bg-gray-1 data-[state=open]:bg-gray-2 hover:bg-gray-2
          data-[state=closed]:cursor-pointer`}
          >
            <div
              className="flex w-full items-center gap-x-6 -2xl:gap-x-4"
              ref={cardRef}
            >
              <div className="w-[2.4rem] h-[2.4rem] relative -2xl:w-[1.8rem] ">
                <Image
                  fill
                  sizes="100px"
                  style={{ objectFit: 'contain' }}
                  alt={`${title}-icon`}
                  src={iconLink as string}
                />
              </div>

              <div className="gap-y-1 flex-1 flex flex-col">
                <Heading size={'3'} className="-2xl:text-sm">
                  {title}
                </Heading>
                <Text size={'2'} className="text-gray-11 -2xl:text-xs">
                  {tagline}
                </Text>
              </div>
            </div>
            {projectUUID === activeProjectId && (
              <ProjectMenu
                title={title}
                projectUUID={projectUUID}
                initialProject={
                  {
                    title,
                    projectUUID,
                    tagline,
                    iconLink,
                    sections,
                    ownerId,
                  } as Project
                }
              />
            )}
          </div>
        </Accordion.Trigger>

        <Accordion.Content asChild>
          <div className="bg-gray-1 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
            <ScrollArea type="auto" className="max-h-[50vh]">
              {sections?.map((s, i) => {
                return (
                  <div key={i}>
                    <ProjectSubsection
                      title={s.title}
                      contentType={s.contentType}
                      content={s.content}
                    />
                    {i == sections.length - 1 ? null : <Divider />}
                  </div>
                );
              })}
            </ScrollArea>
          </div>
        </Accordion.Content>
      </div>
    </Accordion.Item>
  );
};

export default AccordionProjectItem;
