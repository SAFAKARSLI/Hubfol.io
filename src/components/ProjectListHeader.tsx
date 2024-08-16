import React from 'react'


import { Badge, Flex, Heading } from '@radix-ui/themes';

type Props = {}

function ProjectListHeader({}: Props) {
  return (
    <Flex gap={"2"} justify={"start"} align={"center"} mb={"5"} mx={"8"}>
      <Heading size={'4'}>Projects:</Heading>
      <Badge variant='solid' radius='full' size={"2"}>
          2
      </Badge>
    </Flex>
  )
}

export default ProjectListHeader