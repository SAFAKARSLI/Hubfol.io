
import React from 'react';
import ProjectCard from './ProjectCard';
import * as Accordion from '@radix-ui/react-accordion';
import { fetchProjects } from '../actions';

type SidebarProps = {
};

const Sidebar = ({}: SidebarProps) => {
  
  const renderProjects = async () => {
    const projects = await fetchProjects();;
    return projects.map((project) => (
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
      <div className="bg-hubfolio-primary w-[22rem] min-w-[22rem] p-4 pt-8">
        <Accordion.Root
        type="single"
        >
          {renderProjects()}
        </Accordion.Root>
      </div>
  );
};

export default Sidebar;