import Project from '@/types/project';
import ProjectConsole from './ProjectConsole';

type Props = {
  project?: Project;
};

async function ProjectFrame({ project }: Props) {
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
