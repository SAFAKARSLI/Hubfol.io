import Projects from '@/components/Projects'
import React from 'react'

type Props = {
  params: {
    _id: string;
  };
}

export default function page({ params }: Props) {
  return <Projects activeProjectId={params._id}/>
}