"use client"

import React, {useState, useRef, useEffect} from 'react'
import * as Accordion  from '@radix-ui/react-accordion';
import Project from '@/models/project';
import ProjectCard from './ProjectCard';
import { useParams, useRouter  } from 'next/navigation';

type Props = {
  projects: Project[]
  activeProject?: string
}

function ProjectList({projects, activeProject}: Props) {

  const [accordionValue, setAccordionValue] = useState<string | undefined>(activeProject);

  const router = useRouter();
  // const [projects, setProjects] = useState<Project[]>(initialProjects);  

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
    setAccordionValue(_id)
    router.replace("/projects/"+_id, {})
  }

  return (
    <div className="bg-hubfolio-primary w-[22rem] min-w-[22rem] p-4 pt-8">
        <Accordion.Root
        type="single"
        onValueChange={onChangeActiveProject}
        value={accordionValue}
        >
          {renderProjects()}
        </Accordion.Root>
    </div>
  )
}

export default ProjectList