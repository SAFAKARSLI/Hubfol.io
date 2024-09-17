import Project from '@/types/project';
import ProjectConsole from './ProjectConsole';
import { baseUrl } from '@/utils';

type Props = {
  projectUUID: string;
};

async function ProjectFrame({ projectUUID }: Props) {
  const project = (await fetch(`${baseUrl}/api/projects/${projectUUID}`, {
    next: { tags: ['projects'] },
  }).then((r) => r.json())) as Project;

  return (
    <div className="rounded border border-gray-4 h-full w-full overflow-hidden">
      <iframe className="w-full h-full" src={project.url} key={project.uuid} />

      <ProjectConsole project={project} />
    </div>
  );
}

export default ProjectFrame;
