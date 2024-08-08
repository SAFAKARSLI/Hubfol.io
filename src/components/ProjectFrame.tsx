import React from 'react'
import { headers } from "next/headers";

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
      return <iframe src={project.url} className='w-full h-full'/>
    }
  }

  return (renderFrame())

}

export default ProjectFrame