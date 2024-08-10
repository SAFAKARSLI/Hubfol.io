import React from 'react'
import { headers } from "next/headers";
import { Box } from '@radix-ui/themes';
import { getProject } from '@/app/actions';
import { WithId } from 'mongodb';
import Project from '@/models/project';

type Props = {
  activeProjectId: string
}

function ProjectFrame({activeProjectId}: Props) {
  
  async function renderFrame() {
    if (activeProjectId == "NO_ACTIVE_PROJECT") {
      return <div>NO_ACTIVE_PROJECT</div>
    } else {
      const project = (await getProject(activeProjectId)) as Project
      return (
        <Box overflow={"hidden"} className='rounded border border-gray-6' height={"100%"}>
          <iframe src={project.url} className='w-full h-full'/>
        </Box>
      )
    }
  }

  return (renderFrame())

}

export default ProjectFrame