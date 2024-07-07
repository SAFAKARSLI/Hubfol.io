import React from 'react';
import ProjectCard from './ProjectCard';
import * as Accordion from '@radix-ui/react-accordion';

type SidebarProps = {
};

const Sidebar: React.FC<SidebarProps> = ({}) => {


  return (
      <div className="bg-hubfolio-primary w-[22rem] p-4 pt-8">
        <Accordion.Root
        type="single"
        >
          <ProjectCard
            title="YouTube"
            tagline="Video publishing platform"
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
            accordId="https://www.youtube.com/"
          />

          <ProjectCard
            title="Amazon Web Services"
            tagline="Platform for deploying apps"
            iconLink='https://cdn.simpleicons.org/amazonwebservices/_/eee?viewbox=auto'     
            description='Lorem ipsum dolor sit amet consectetur. Lacinia arcu dui nulla nulla et. Aenean proin lacus purus faucibus faucibus congue sed enim venenatis. Vestibulum sed vel neque tempor purus mauris mi tempus dignissim. Ut commodo eu pellentesque enim interdum tellus convallis.'
            techStack={['react', 'javascript', 'nextdotjs']}
            tags={["OOP (Object-Oriented Programming)",
                "Bubble Sort",
                "Stable Diffusion"]}
            accordId="https://react-bootstrap.netlify.app/"
          />
        </Accordion.Root>
      </div>
  );
};

export default Sidebar;