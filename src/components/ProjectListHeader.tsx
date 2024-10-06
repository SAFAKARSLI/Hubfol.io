import React from 'react';

import { Badge, Flex, Heading } from '@radix-ui/themes';

type Props = {
  projectCount: number;
};

function ProjectListHeader({ projectCount }: Props) {
  return (
    <Flex gap={'2'} justify={'start'} align={'center'} mx={'5'} my={'3'}>
      <Heading size={'4'}>Projects:</Heading>
      <Badge variant="solid" radius="full" size={'2'}>
        {projectCount}
      </Badge>
    </Flex>
  );
}

export default ProjectListHeader;
