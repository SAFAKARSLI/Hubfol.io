import React from 'react'

type Props = {
    title: string;
    outline: string;
    techStack: string[];
}

export default function ProjectCard({title, outline, techStack}: Props) {
  return (
    <div className='flex-col p-2 
    bg-[--hubfolio-secondary-dark] 
    border-b border-hubfolio-primary/50
    hover:bg-[--hubfolio-secondary]'>
        <div className='text-xl py-2'>{title}</div>
        <div>{outline}</div>
    </div>
  )
}