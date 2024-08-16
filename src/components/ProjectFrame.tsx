import React from 'react'
import { headers } from "next/headers";
import { Box } from '@radix-ui/themes';
import { getProject } from '@/app/actions';
import { WithId } from 'mongodb';
import Project from '@/models/project';
import Image from 'next/image';
import { Text, Flex } from '@radix-ui/themes';

type Props = {
  activeProjectId: string
}

function ProjectFrame({activeProjectId}: Props) {
  
  async function renderFrame() {
    if (activeProjectId == "NO_ACTIVE_PROJECT") {
      return <Flex direction={"column"} gap={"3"} className='h-full w-full items-center justify-center'>
        <Image alt='brand-logo' src="/hubfolio-dark-logo.png" width={300} height={300}/>
        <Text weight={"bold"} size={"6"}>Select a Project To View</Text>
        </Flex>
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