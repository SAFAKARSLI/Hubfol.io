import React, {useEffect, useState} from 'react';

import * as Accordion from '@radix-ui/react-accordion';
import ProjectSubsection from './ProjectSubsection';
import Divider from './subsections/Divider';

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

  // const [sections, setSections] = useState<Section[]>();
  // const [isLoading, setIsLoading] = useState(false);
  
  // // const fetchFullProject = async () => {
  // //   const projectSections = (
  // //     await fetch("http://localhost:3000/api/projects/"+_id+"/content", {cache: "no-cache"}).then((project) => project.json())
  // //   ) as {_id: string, content: Section[]}
    
  // //   setSections(projectSections.content)
  // // }


  return (
    <Accordion.Item value={_id} className='my-4' asChild onClick={() => console.log("Card is clicked")}> 
      <div className='border-hubfolio-border rounded
      border
      overflow-hidden
      data-[state=open]:shadow-custom-active-project 
      shadow-custom-default-project
      hover:shadow-custom-active-project' >

        <Accordion.Trigger asChild>
          <div className={`flex gap-x-6 items-center leading-none text-hubfolio-text bg-hubfolio-primary-01 px-6 py-4 data-[state=closed]:cursor-pointer
           rounded-t `}
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