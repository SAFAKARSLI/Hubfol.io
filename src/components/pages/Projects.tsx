import React from 'react';

import Project from '@/types/project';
import ProjectsSidePanel from '../ProjectsSidePanel';
import next from 'next';
import { notFound } from 'next/navigation';

interface ProjectsProps {
  userUUID: string;
  children?: React.ReactNode;
}

const Projects = async ({ userUUID, children }: ProjectsProps) => {
  const projects = (await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects?userUUID=${userUUID}`,
    {
      cache: 'no-store',
      next: {
        tags: ['projects'],
      },
    }
  ).then((r) => {
    if (!r.ok) {
      notFound();
    }
    return r.json();
  })) as Project[];

  return (
    <div className="flex w-screen h-full">
      <div className="flex-none">
        <ProjectsSidePanel initialProjects={projects} userUUID={userUUID} />
      </div>
      <div className="flex-1 m-3">{children}</div>
    </div>
  );
};

export default Projects;
