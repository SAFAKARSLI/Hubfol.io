import React from 'react'
import ProfileCard from './ProfileCard'
import ProjectList from './ProjectList'

type Props = {}

export default function LeftPanel({}: Props) {
  return (
    <div className='h-screen w-64 flex-col drop-shadow-lg'>
      <ProfileCard/>
      <ProjectList/>
    </div>
  )
}


