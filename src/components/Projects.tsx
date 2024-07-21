import React from 'react';

import { headers } from "next/headers";
import ProjectList from './ProjectList';

import Project from '@/models/project';
import ProjectFrame from './ProjectFrame';


type ProjectsProps = {
};

const Projects = ({}: ProjectsProps) => {

  async function render() {
    const fetchProjects = (
      await fetch("http://localhost:3000/api/projects?sections=initial", {cache: "force-cache"}).then((projects) => projects.json())
    ) as Project[];

    return <ProjectList initialProjects={fetchProjects} />;
  }
  

  return (
    <div className='flex flex-1'>
      {render()}
      <div className="flex w-full items-center justify-center bg-hubfolio-bg text-center p-6">
        <ProjectFrame />
      </div>
    </div>
  );
};

export default Projects;