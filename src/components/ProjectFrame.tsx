'use client';
import React, {
  TouchEventHandler,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import Project from '@/types/project';
import { Spinner } from '@radix-ui/themes';
import ProjectConsole from './ProjectConsole';
import { useParams } from 'next/navigation';

type Props = {
  project?: Project;
};

function ProjectFrame({ project }: Props) {
  return (
    <div className="rounded border border-gray-4 overflow-hidden w-full h-full">
      <iframe
        // hidden={spinner}
        src={project!.url!}
        className="w-full h-full"
        key={project?.projectUUID}
        // onLoad={() => setSpinner(false)}
      />

      <ProjectConsole project={project} />
    </div>
  );
}

export default ProjectFrame;
