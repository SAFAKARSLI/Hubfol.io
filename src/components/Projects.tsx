import React from 'react';

import { headers } from "next/headers";
import ProjectList from './ProjectList';

import Project from '@/models/project';
import ProjectFrame from './ProjectFrame';


type ProjectsProps = {
  activeProject?: string;
};

const Projects = ({activeProject}: ProjectsProps) => {

  async function render() {
    const fetchProjects = (
        await fetch("http://localhost:3000/api/projects", {cache: "no-cache"}).then((projects) => projects.json())
      ) as Project[];

    return <ProjectList projects={fetchProjects} activeProject={activeProject}/>;
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