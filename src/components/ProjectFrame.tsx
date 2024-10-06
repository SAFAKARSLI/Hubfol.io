'use client';

import Project from '@/types/project';
import ProjectConsole from './ProjectConsole';
import { DropdownMenu, IconButton, Text } from '@radix-ui/themes';
import {
  DesktopIcon,
  DotsHorizontalIcon,
  ExternalLinkIcon,
  MobileIcon,
  ReloadIcon,
} from '@radix-ui/react-icons';
import React from 'react';

type Props = {
  project?: Project;
};

function ProjectFrame({ project }: Props) {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [url, setUrl] = React.useState(project!.url);

  return (
    <div className="h-full flex flex-col">
      <div className="h-[6rem] mx-5 ship flex-none flex flex-col justify-center">
        <div className="w-full bg-gray-2 h-[2rem] rounded-full flex items-center border border-gray-4">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <IconButton variant="ghost" radius="full">
                <DotsHorizontalIcon />
              </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item>
                <div>Edit</div>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <div>Delete</div>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <IconButton variant="ghost" radius="full">
            <ReloadIcon />
          </IconButton>
          <IconButton variant="ghost" radius="full">
            <DesktopIcon />
          </IconButton>
          <IconButton variant="ghost" radius="full">
            <MobileIcon />
          </IconButton>
          <IconButton variant="ghost" radius="full">
            <ExternalLinkIcon />
          </IconButton>
        </div>
        <Text size={'1'} className="text-gray-10 mt-2">
          {url}
        </Text>
      </div>
      <div className="rounded border border-gray-4 overflow-hidden flex-grow mx-5 mb-5">
        <iframe
          onClick={(e) => {
            e.preventDefault();
            console.log(e);
          }}
          ref={iframeRef}
          height={'100%'}
          width={'100%'}
          src={project!.url}
          key={project!.uuid}
        />
      </div>

      <ProjectConsole project={project!} />
    </div>
  );
}

export default ProjectFrame;
