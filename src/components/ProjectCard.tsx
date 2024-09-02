import * as Accordion from '@radix-ui/react-accordion';
import { Box, Text, Heading, ScrollArea } from '@radix-ui/themes';
import Image from 'next/image';

import Project, { Section } from '@/types/project';

import ProjectSubsection from './ProjectSubsection';
import Divider from './subsections/Divider';
import ProjectMenu from './ProjectMenu';

interface ProjectCardProps {
  projectUUID: string;
  title: string;
  tagline: string;
  iconLink: string | ArrayBuffer;
  sections: Section[] | null;
  activeProjectId: string;
  ownerId: string;
}

const ProjectCard = ({
  projectUUID,
  title,
  tagline,
  iconLink,
  sections,
  activeProjectId,
  ownerId,
}: ProjectCardProps) => {
  return (
    <Accordion.Item value={projectUUID} asChild>
      <Box className="mx-8 mb-6 rounded border border-gray-4 overflow-hidden">
        <Accordion.Trigger asChild>
          <div
            className={`flex py-3 px-8 
          bg-gray-1 data-[state=open]:bg-gray-2 hover:bg-gray-2
          data-[state=closed]:cursor-pointer `}
          >
            <div className="flex justify-between h-[3rem] w-full items-center gap-x-8">
              <div className="w-[2.4rem] h-[2.4rem] relative">
                <Image
                  fill
                  style={{ objectFit: 'contain' }}
                  alt={`${title}-icon`}
                  src={iconLink as string}
                />
              </div>

              <div className="gap-y-1 flex-1 flex flex-col">
                <Heading size={'3'}>{title}</Heading>
                <Text size={'2'} className="text-gray-11">
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
          <div className="bg-gray-1 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden ">
            <ScrollArea type="auto" className="max-h-[50rem] w-full">
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
      </Box>
    </Accordion.Item>
  );
};

export default ProjectCard;
