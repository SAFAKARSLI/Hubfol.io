import React from 'react';

import ProjectList from './ProjectList';
import Project from '@/models/project';
import ProjectFrame from './ProjectFrame';
import { Box, Flex, Container } from '@radix-ui/themes';

type ProjectsProps = {
  activeProject?: string;
};

const Projects = ({activeProject}: ProjectsProps) => {

  async function render() {
    const fetchProjects = (
        await fetch("http://localhost:3000/api/projects", {cache: "no-cache"}).then((projects) => projects.json())
      ) as Project[];
      console.log(fetchProjects)
    return <ProjectList initialProjects={fetchProjects} activeProject={activeProject}/>;
  }
  

  return (
    <Flex flexGrow={"1"}>
      {render()}
      <Box width={"100%"} height={"100%"} p={"6"}>
        <ProjectFrame />
      </Box>
    </Flex>
  );
};

export default Projects;