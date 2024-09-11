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
import { getProject } from '@/app/actions';

type Props = {
  projectUUID: string;
};

async function ProjectFrame({ projectUUID }: Props) {
  const project = (await getProject(projectUUID)) as Project;
  return (
    <div className="rounded border border-gray-4 overflow-hidden w-full h-full">
      <iframe
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
