import Project from '@/types/project';
import ProjectConsole from './ProjectConsole';
import { baseUrl } from '@/utils';

type Props = {
  projectUUID: string;
};

async function ProjectFrame({ projectUUID }: Props) {
  const project = (
    await fetch(`${baseUrl}/api/projects/${projectUUID}`)
  ).json();

  return (
    <div className="rounded border border-gray-4 overflow-hidden w-full h-full">
      <iframe
        src={project!.url!}
        className="w-full h-full"
        key={project?.uuid}
        // onLoad={() => setSpinner(false)}
      />

      <ProjectConsole project={project} />
    </div>
  );
}

export default ProjectFrame;
