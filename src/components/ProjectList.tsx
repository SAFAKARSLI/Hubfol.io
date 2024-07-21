"use client"

import React, {useEffect, useState} from 'react'
import * as Accordion  from '@radix-ui/react-accordion';
import Project from '@/models/project';
import ProjectCard from './ProjectCard';

type Props = {}

function ProjectList({}: Props) {

  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<string>("");


  useEffect(() => {
    const fetchInitialProjects = async () => {
      const fetchProjects = (
        await fetch("http://localhost:3000/api/projects?sections=initial", {cache: "no-cache"}).then((projects) => projects.json())
        
      ) as Project[];
  
      console.log(fetchProjects)
      setProjects(fetchProjects);
    };
    fetchInitialProjects();
  }, [])

  async function onChangeActiveProject(_id: string) {
    const fullFetchProject = (await fetch("http://localhost:3000/api/projects/"+_id).then((project) => project.json())) as Project
    console.log(fullFetchProject)
    setProjects(projects.map(p => 
      String(p._id) === _id ? { ...p, ...fullFetchProject } : p
    ));
    setActiveProject(_id)
  }

  return (
    <div className="bg-hubfolio-primary w-[22rem] min-w-[22rem] p-4 pt-8">
        <Accordion.Root
        type="single"
        value={activeProject}
        onValueChange={onChangeActiveProject}
        >
          {projects.map((p) => {
            return (
              <ProjectCard
                _id={String(p._id)}
                title={p.title}
                tagline={p.tagline}
                iconLink={p.iconLink} 
                sections={p.sections}
              />
            )})
          }
        </Accordion.Root>
    </div>
  )
}

export default ProjectList