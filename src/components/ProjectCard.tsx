import React, {useEffect, useState} from 'react';

import * as Accordion from '@radix-ui/react-accordion';
import ProjectSubsection from './ProjectSubsection';
import Divider from './subsections/Divider';
import Project from '@/models/project';

interface ProjectCardProps {
  _id: string,
  title: string;
  tagline: string;
  iconLink: string;
  content: Content[] | null
}

interface Content {
  title: string;
  contentType: string;
  content: string | Array<string> | Array<object>;
}

const ProjectCard = ({_id, title, tagline, iconLink, content}: ProjectCardProps) => {

  // const [properties, setProperties] = useState<any>({ _id: _id, title: title, tagline: tagline, iconLink: iconLink, content: content });

  // const fetchProject = async () => {
  //   const project = (await fetch("http://localhost:3000/api/projects/"+_id, {cache: "no-cache"}).then((project) => project.json())) as Project;
  //   setProperties(project);
  // }

  return (
    <Accordion.Item value={_id} className='m-4' asChild> 
      <div className='border-hubfolio-border rounded
      border
      overflow-hidden
      data-[state=open]:shadow-custom-active-project 
      shadow-custom-default-project
      hover:shadow-custom-active-project' >

        <Accordion.Trigger asChild>
          <div className={`flex p-6 gap-x-6 items-center leading-none text-hubfolio-text bg-hubfolio-primary-01  data-[state=closed]:cursor-pointer`}
          >
            <img height="30" width="30" src={iconLink}/>
            <div className="basis-10/12 gap-y-2 flex flex-col ">
              <h2 className="text-lg font-bold tracking-wider">{title}</h2>
              <p className="text-xs text-hubfolio-subtext-darker ">{tagline}</p>
            </div>
            <div className='basis-1/12'></div>
          </div>
        </Accordion.Trigger>

        <Accordion.Content asChild>
          <div className='project-content w-full bg-hubfolio-primary-02 text-hubfolio-subtext rounded-b data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden px-6 '>
            {content?.map((s, i) => {
              return (
                <div key={i}>
                  <ProjectSubsection title={s.title} contentType={s.contentType} content={s.content} />
                  {i == content.length - 1 ? null : <Divider />}
                </div>
              )})
            }
          </div>
        </Accordion.Content>
        
      </div>
    </Accordion.Item>
  );
};

export default ProjectCard;