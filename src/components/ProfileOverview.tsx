import { DotFilledIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Badge, DropdownMenu, Button, IconButton, Text, Flex, Box } from '@radix-ui/themes';
import React from 'react';
import ViewContactInfo from './ViewContactInfo';


interface ProfileOverviewProps {
  userName: string;
  title: string;
  location: string;
  contactInfo: string;
}

 
const ProfileOverview: React.FC<ProfileOverviewProps> = ({userName, title, location, contactInfo}) => {
  return (
    <Flex height="6rem" width="24rem" minWidth={"24rem"} px="7" py="4" className='bg-gray-1  border border-gray-4'>
      <Flex flexGrow="1" justify={'between'} direction={"column"} >
        <Flex direction={"column"} gap={"1"} >
          <Flex gap={"2"}>
            <Text as='p' size="2" weight="medium">{userName} </Text>
            <Badge>Open to Work</Badge>
          </Flex>
          <Text as='p' size="1" color='gray'>{title}</Text>
        </Flex>
        <Box>
          <ViewContactInfo />
        </Box>
      </Flex>
      <Flex direction={"column"} justify={"between"} align={"end"} height={"full"}>
        <DropdownMenu.Root >
          <DropdownMenu.Trigger >
            <IconButton variant="ghost" color='gray' radius='medium' >
              <DotsHorizontalIcon width="16" height="16" />
            </IconButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content size="1">
            <DropdownMenu.Item>Share</DropdownMenu.Item>
            <DropdownMenu.Item>View full profile</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root> 
        <Badge size="2"  variant="soft" radius='medium'>$45/hr</Badge>
      </Flex>
    </Flex>
  );
};

export default ProfileOverview;