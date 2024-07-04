'use client'
import React from 'react';

import * as Accordion from '@radix-ui/react-accordion';
import ProjectSubsection from './ProjectSubsection';
import Divider from './Divider';

interface ProjectCardProps {
  title: string;
  tagline: string;
  description: any;
  techStack: string[];
  tags: string[];
  iconLink: string;
  accordId: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, tagline, description, techStack, tags, iconLink, accordId}) => {

  return (
    <Accordion.Item value={accordId} className='m-4' asChild>
      <div className='border-hubfolio-border  rounded 
      border
      data-[state=open]:shadow-custom-active-project 
      shadow-custom-default-project
      hover:shadow-custom-active-project' >

        <Accordion.Trigger asChild>
          <div className={`flex gap-x-6 items-center leading-none text-hubfolio-text bg-hubfolio-primary-01 px-6 py-4 data-[state=closed]:cursor-pointer
          data-[state=closed]:rounded rounded-t `}
          >
            <img height="30" width="30" src={iconLink}/>
            <div className="basis-10/12 gap-y-2 flex flex-col ">
              <h2 className="text-lg font-bold">{title}</h2>
              <p className="text-sm text-hubfolio-subtext-darker ">{tagline}</p>
            </div>
            <div className='basis-1/12'></div>
          </div>
        </Accordion.Trigger>

        <Accordion.Content asChild>
          <div>
            <div className='project-content w-full data-[state=closed]:rounded bg-hubfolio-primary-02 text-hubfolio-subtext rounded-b data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden px-6 '>
              <ProjectSubsection title='Project Description:' contentType='text' content={description} />
              <Divider />
              <ProjectSubsection title='Tech Stack:' contentType='techStack' content={techStack}/>
            </div>
            <span className='active-bar'></span>
          </div> 
        </Accordion.Content>
        
      </div>
    </Accordion.Item>
  );
};

export default ProjectCard;