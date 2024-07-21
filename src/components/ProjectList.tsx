"use client"

import React, {useState, useEffect, useReducer, useRef} from 'react'
import * as Accordion  from '@radix-ui/react-accordion';
import Project from '@/models/project';
import ProjectCard from './ProjectCard';

type Props = {
  initialProjects: Project[]
}

function ProjectList({initialProjects}: Props) {

  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const activeProject = useRef("")

  function renderProjects() {
    return projects.map((p, i) => {
      return (
        <ProjectCard 
          key={i}
          _id={String(p._id)}
          title={p.title}
          tagline={p.tagline}
          iconLink={p.iconLink}
          content={p.content}
        />
      )
    })
  }

  async function onChangeActiveProject(_id: string) {
    const fullFetchProject = (
      await fetch("http://localhost:3000/api/projects/"+_id+"/content", 
        {cache: "force-cache"}).then((p) => p.json())
    ) as Project

    setProjects(prevProjects => prevProjects.map(p => 
      String(p._id) === _id ? { ...p, ...fullFetchProject } : p
    ));

    activeProject.current = _id
  }

  return (
    <div className="bg-hubfolio-primary w-[22rem] min-w-[22rem] p-4 pt-8">
        <Accordion.Root
        type="single"
        onValueChange={onChangeActiveProject}
        value={activeProject.current}
        >
          {renderProjects()}
        </Accordion.Root>
    </div>
  )
}

export default ProjectList