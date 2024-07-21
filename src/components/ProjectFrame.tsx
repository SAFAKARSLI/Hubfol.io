import React from 'react'

import { headers } from "next/headers";

type Props = {}

function ProjectFrame({}: Props) {

  async function renderFrame() {

    const header = headers().get("x-current-path");
    const param = header?.substring(header.lastIndexOf("/")+1);

    if (param == "projects") {
      return (
        <div>Hello world</div>
      )
    } else {
      const projectId = await fetch("http://localhost:3000/api/projects/"+param+"/url", {cache: "force-cache"}).then((p) => p.json());

      return <iframe src={projectId.url} className='w-full h-full'/>
    }

    
    
  }

  return (renderFrame())
}

export default ProjectFrame