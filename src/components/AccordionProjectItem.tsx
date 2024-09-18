'use client';
import * as Accordion from '@radix-ui/react-accordion';
import { Text, Heading, ScrollArea } from '@radix-ui/themes';
import ProjectMenu from './ProjectMenu';
import { useEffect, useRef } from 'react';
import { defaultIconLink } from '@/utils';
import { Section } from '@/types/section';
import Subsection from './project-card-subsections/Subsection';
import Divider from './project-card-subsections/Divider';

interface AccordionProjectItemProps {
  uuid: string;
  name: string;
  tagline: string;
  iconLink: string | ArrayBuffer;
  sections: Section[];
  activeProjectId: string;
  ownerId: string;
  url: string;
}

const AccordionProjectItem = ({
  uuid,
  name,
  tagline,
  iconLink,
  sections,
  activeProjectId,
  ownerId,
  url,
}: AccordionProjectItemProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeProjectId === uuid) {
      cardRef.current?.scrollIntoView({
        behavior: 'instant',
        block: 'start',
        inline: 'nearest',
      });
    }
  }, [activeProjectId]);
  return (
    <Accordion.Item value={uuid} asChild>
      <div
        className={`rounded border overflow-hidden data-[state=open]:shadow-gray-3 border-gray-4 shadow-md w-full m-auto`}
      >
        <Accordion.Trigger asChild>
          <div
            className={`flex py-3 sm:px-7 px-4 
          ${activeProjectId == uuid && 'bg-gray-2'} bg-gray-1 hover:bg-gray-2
          data-[state=closed]:cursor-pointer w-full items-center h-[4rem]`}
            ref={cardRef}
          >
            <img
              className="h-[2.3rem] w-[2.3rem] "
              style={{ objectFit: 'contain' }}
              alt={`${name}-icon`}
              src={iconLink ? (iconLink as string) : defaultIconLink}
            />

            <div className="min-w-[5rem] sm:mx-7 mx-4 flex-1">
              <Heading
                size={'3'}
                as="h2"
                className="-2xl:text-sm truncate mb-1"
              >
                {name}
              </Heading>
              <Text
                size={'2'}
                as="p"
                className="text-gray-11 -2xl:text-xs truncate"
              >
                {tagline}
              </Text>
            </div>

            <div className="h-full z-50">
              {uuid === activeProjectId && (
                <ProjectMenu title={name} projectUUID={uuid} />
              )}
            </div>
          </div>
        </Accordion.Trigger>

        <Accordion.Content asChild>
          <div className="bg-gray-1 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden z-50">
            <ScrollArea type="auto" className="max-h-[40vh]">
              {sections?.map((s, i) => {
                return (
                  <div key={i}>
                    <Subsection
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
