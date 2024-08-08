import React from 'react'
import { headers } from "next/headers";
import { Box } from '@radix-ui/themes';

type Props = {}

function ProjectFrame({}: Props) {
  
  async function renderFrame() {
    const header = headers().get("x-current-path");
    const _id = header?.substring(header.lastIndexOf("/")+1);
    if (_id == "projects") {
      return (
        <div>Hello world</div>
      )
    } else {
      const project = await fetch("http://localhost:3000/api/projects/"+_id, {cache: "no-cache"}).then((project) => project.json());
      console.log(project)
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