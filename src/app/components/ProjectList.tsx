import React from 'react'

import ProjectCard from './ProjectCard'

type Props = {}

export default function ProjectList({}: Props) {

    type Project = {
        title: string;
        outline: string;
        techStack: string[];
    };

    const projects: Project[] = [
        {
            title: 'Project 1',
            outline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod semper nunc, id tincidunt nisl ultrices a.',
            techStack: ['React', 'TypeScript', 'CSS']
        },
        {
            title: 'Project 2',
            outline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod semper nunc, id tincidunt nisl ultrices a.',
            techStack: ['Angular', 'JavaScript', 'HTML']
        },
        {
            title: 'Project 3',
            outline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod semper nunc, id tincidunt nisl ultrices a.',
            techStack: ['Vue', 'JavaScript', 'SCSS']
        }
    ];

    return (
        <div className='bg-[--hubfolio-secondary] text-black h-full'>
            {projects.map((project, index) => (
                <ProjectCard 
                    key={index} 
                    title={project.title} 
                    outline={project.outline} 
                    techStack={project.techStack} />
            ))}
        </div>
    );
}