import * as Accordion from '@radix-ui/react-accordion';
import { Box, Text, Heading } from '@radix-ui/themes';
import Image from 'next/image';

import { Section } from '@/types/project';

import DeleteProjectDialog from './DeleteProjectDialog';
import ProjectSubsection from './ProjectSubsection';
import Divider from './subsections/Divider';

interface ProjectCardProps {
  _id: string;
  title: string;
  tagline: string;
  iconLink: string | ArrayBuffer;
  sections: Section[] | null;
  activeProjectId: string;
}

const ProjectCard = ({
  _id,
  title,
  tagline,
  iconLink,
  sections,
  activeProjectId,
}: ProjectCardProps) => {
  return (
    <Accordion.Item value={_id} asChild>
      <Box className="mx-5 mb-5 rounded border border-gray-4 overflow-hidden">
        <Accordion.Trigger asChild>
          <div
            className={`flex py-4 px-8 
          bg-gray-1 data-[state=open]:bg-gray-2 hover:bg-gray-2
          data-[state=closed]:cursor-pointer `}
          >
            <div className="flex justify-between w-full items-center gap-x-8">
              <Image
                width={'40'}
                height="40"
                alt={`${title}-icon`}
                src={iconLink as string}
              />

              <div className="gap-y-1 flex-1 flex flex-col">
                <Heading size={'3'}>{title}</Heading>
                <Text size={'2'} className="text-gray-11">
                  {tagline}
                </Text>
              </div>
            </div>
            {_id === activeProjectId && (
              <DeleteProjectDialog title={title} projectUUID={_id} />
            )}
          </div>
        </Accordion.Trigger>

        <Accordion.Content asChild>
          <div className="bg-gray-1 data-[state=open]:animate-slideDown overflow-hidden px-6 ">
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
          </div>
        </Accordion.Content>
      </Box>
    </Accordion.Item>
  );
};

export default ProjectCard;
