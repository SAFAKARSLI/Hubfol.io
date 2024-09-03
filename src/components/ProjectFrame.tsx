import React from 'react';
import { Box } from '@radix-ui/themes';
import { getProject } from '@/app/actions';
import Project from '@/types/project';
import Image from 'next/image';
import { Text, Flex } from '@radix-ui/themes';

type Props = {
  activeProjectId: string;
};

function ProjectFrame({ activeProjectId }: Props) {
  async function renderFrame() {
    if (!activeProjectId) {
      return (
        <Flex
          direction={'column'}
          gap={'3'}
          className="h-full w-full items-center justify-center flex-1"
        >
          <Image
            alt="brand-logo"
            src="/hubfolio-dark-logo.png"
            width={300}
            height={300}
          />
          <Text weight={'bold'} size={'6'}>
            Select a Project To View
          </Text>
        </Flex>
      );
    } else {
      const project = (await getProject(activeProjectId)) as Project;
      return (
        <div className="rounded border border-gray-6 overflow-hidden h-full flex-1">
          <iframe src={project.url} className="w-full h-full" />
        </div>
      );
    }
  }

  return renderFrame();
}

export default ProjectFrame;
