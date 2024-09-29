import Project from '@/types/project';
import ProjectConsole from './ProjectConsole';
import { baseUrl } from '@/utils';
import { notFound } from 'next/navigation';

type Props = {
  props?: Project;
};

async function ProjectFrame({ props: project }: Props) {
  console.log(project);
  return (
    <div className="rounded border border-gray-4 h-full w-full">
      <iframe
        className="w-full h-full"
        src={project!.url}
        key={project!.uuid}
      />

      <ProjectConsole project={project!} />
    </div>
  );
}

export default ProjectFrame;
