import { getProjects } from '@/app/actions';
import Project from '@/types/project';
import React from 'react';

type Props = {
  userUUID: string;
};

async function MainBigProjectCardList({ userUUID }: Props) {
  const projects = (await getProjects(userUUID)) as Project[];
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      {projects.map((project: Project) => {
        return (
          <div
            key={project.projectUUID}
            className="flex flex-col gap-2 w-[10rem] bg-gray-2"
          >
            <div className="flex justify-between">
              <h2 className="text-md font-bold">{project.title}</h2>
              <h3 className="text-sm font-bold">{project.tagline}</h3>
            </div>
            <p className="text-gray-400">{project.url}</p>
          </div>
        );
      })}
    </div>
  );
}

export default MainBigProjectCardList;
