"use client"

import React, {useState, useRef, useEffect} from 'react'
import { useParams, useRouter, useSearchParams  } from 'next/navigation';

import * as Accordion  from '@radix-ui/react-accordion';

import Project from '@/models/project';
import ProjectCard from './ProjectCard';

type Props = {
  initialProjects: Project[]
  activeProject?: string
}

function ProjectList({initialProjects}: Props) {
  
  const { _id } = useParams<{ _id: string }>();
  const [accordionValue, setAccordionValue] = useState<string>("");
  const [projectList, setProjectList] = useState<Project[]>(initialProjects);
  const router = useRouter();

  useEffect(() => {
    if (_id) {
      setAccordionValue(_id)
    }
  });

  function renderProjects() {
    return projectList.map((p, i) => {
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

  function onChangeActiveProject(_id: string) {
    console.log("Changed active project to: ", _id);
    router.push("/projects/"+_id);    
  }

  return (
    <div className="w-[24rem] min-w-[24rem] h-[calc(100vh-8rem)] p-4 pt-8 overflow-y-scroll">
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