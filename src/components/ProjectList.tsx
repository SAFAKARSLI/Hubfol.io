"use client"

import React, {useState, useRef, useEffect} from 'react'
import { useParams, useRouter, useSearchParams  } from 'next/navigation';

import * as Accordion  from '@radix-ui/react-accordion';

import Project from '@/models/project';
import ProjectCard from './ProjectCard';
import { Box, Flex } from '@radix-ui/themes';

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
          activeProjectId={_id}
        />
      )
    })
  }

  function onChangeActiveProject(_id: string) {
    console.log("Changed active project to: ", _id);
    router.push("/projects/"+_id);    
  }

  return (
    <Box width={"24rem"} minWidth={"24rem"} py={"4"} overflowY={"auto"} className="h-[calc(100vh-8rem)] bg-gray-1 border-x border-b border-gray-4">
        <Accordion.Root
        type="single"
        onValueChange={onChangeActiveProject}
        value={accordionValue}
        >
          <Flex direction={"column"}>
          {renderProjects()}
          </Flex>
        </Accordion.Root>
    </Box>
  )
}

export default ProjectList