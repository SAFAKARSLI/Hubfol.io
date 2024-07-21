import React from 'react';

import { headers } from "next/headers";
import ProjectList from './ProjectList';

import ProjectCard from './ProjectCard';
import Project from '@/models/project';


type ProjectViewerProps = {
};

const ProjectViewer = ({}: ProjectViewerProps) => {

  const header = headers().get("x-current-path");
  const pathname = header?.substring(header.lastIndexOf("/")+1);

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
        <iframe src="https://tureng.com" className="w-full h-full" />
      </div>
    </div>
  );
};

export default ProjectViewer;