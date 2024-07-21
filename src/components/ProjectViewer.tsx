import React from 'react';
import * as Accordion  from '@radix-ui/react-accordion';
import ProjectCard from './ProjectCard';
import Project from '@/models/project';

type ProjectViewerProps = {
};

const ProjectViewer = ({}: ProjectViewerProps) => {
  
  const renderProjects = async () => {
    const projects = (
      await fetch("http://localhost:3000/api/projects", {cache: "force-cache"})
      .then((projects) => projects.json())
  ) as Project[];

    return projects.map((project: Project) => (
      <ProjectCard
        key={String(project._id)}
        title={project.title}
        tagline={project.tagline}
        iconLink={project.iconLink}
        description={project.description}
        techStack={project.techStack}
        tags={project.tags}
        accordId={String(project._id)}
      />
    ));
  };

  


  return (
    <div className='flex flex-1'>
      <div className="bg-hubfolio-primary w-[22rem] min-w-[22rem] p-4 pt-8">
        <Accordion.Root
        type="single"
        value={undefined}
        >
          {renderProjects()}
        </Accordion.Root>

        {/* <div className="flex w-full items-center justify-center bg-hubfolio-bg text-center p-6">
            <iframe src="https://tureng.com" className="w-full h-full" />
        </div> */}
      </div>
    </div>
  );
};

export default ProjectViewer;