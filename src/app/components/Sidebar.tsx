import React from 'react';
import ProjectCard from './ProjectCard';
import * as Accordion from '@radix-ui/react-accordion';


const Sidebar: React.FC = () => {


  return (
      <div className="bg-hubfolio-primary w-[22rem]">
        <Accordion.Root
        type="single"
        >
          <ProjectCard
            title="YouTube"
            tagline="Lorem ipsum dolor sit "
            iconLink='https://cdn.simpleicons.org/youtube?viewbox=auto'     
            description={
                <>
                  Lorem ipsum dolor sit amet consectetur. Lacinia arcu dui nulla nulla et. 
                  Aenean proin lacus purus faucibus faucibus congue sed enim venenatis. <br /> <br />
                  Vestibulum sed vel neque tempor purus mauris mi tempus dignissim. Ut commodo eu pellentesque enim interdum tellus convallis.
                </>
            }
            techStack={['react', 'javascript', 'nextdotjs']}
            tags={["OOP (Object-Oriented Programming)",
                "Bubble Sort",
                "Stable Diffusion"]}
            accordId="item-1"
          />

          <ProjectCard
            title="Amazon Web Services"
            tagline="An app for deploying apps."
            iconLink='https://cdn.simpleicons.org/amazonwebservices/_/eee?viewbox=auto'     
            description='Lorem ipsum dolor sit amet consectetur. Lacinia arcu dui nulla nulla et. Aenean proin lacus purus faucibus faucibus congue sed enim venenatis. Vestibulum sed vel neque tempor purus mauris mi tempus dignissim. Ut commodo eu pellentesque enim interdum tellus convallis.'
            techStack={['react', 'javascript', 'nextdotjs']}
            tags={["OOP (Object-Oriented Programming)",
                "Bubble Sort",
                "Stable Diffusion"]}
            accordId="item-2"
          />
        </Accordion.Root>
      </div>
  );
};

export default Sidebar;