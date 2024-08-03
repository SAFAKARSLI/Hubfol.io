import Projects from '@/components/Projects'
import React from 'react'

import { headers } from "next/headers";

type Props = {}

export default function page({}: Props) {

  const header = headers().get("x-current-path");
  const _id = header?.substring(header.lastIndexOf("/")+1);

  return <Projects activeProject={_id}/>
}