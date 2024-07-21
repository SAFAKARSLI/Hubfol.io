import React from 'react';

import { headers } from "next/headers";
import ProjectList from './ProjectList';


type ProjectViewerProps = {
};

const ProjectViewer = ({}: ProjectViewerProps) => {

  const header = headers().get("x-current-path");
  const pathname = header?.substring(header.lastIndexOf("/")+1);

  
  

  return (
    <div className='flex flex-1'>
      <ProjectList />
      <div className="flex w-full items-center justify-center bg-hubfolio-bg text-center p-6">
        <iframe src="https://tureng.com" className="w-full h-full" />
      </div>
    </div>
  );
};

export default ProjectViewer;