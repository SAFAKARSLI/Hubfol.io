import React from 'react';

import ProjectList from './ProjectList';
import Project from '@/types/project';
import ProjectFrame from './ProjectFrame';
import { Box, Flex } from '@radix-ui/themes';
import { getProjects } from '@/app/actions';

interface ProjectsProps {
  activeProjectId: string;
  userUUID: string;
}

const Projects = ({ activeProjectId, userUUID }: ProjectsProps) => {
  async function render() {
    const fetchProjects = (await getProjects(userUUID)) as Project[];
    return (
      <ProjectList
        initialProjects={fetchProjects}
        activeProjectId={activeProjectId}
      />
    );
  }

  return (
    <Flex flexGrow={'1'}>
      {render()}
      <Box width={'100%'} height={'100%'} p={'5'}>
        <ProjectFrame activeProjectId={activeProjectId} />
      </Box>
    </Flex>
  );
};

export default Projects;
