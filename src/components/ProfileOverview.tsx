import { DotFilledIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Badge, DropdownMenu, Button, IconButton, Text, Flex, Box } from '@radix-ui/themes';
import React from 'react';


interface ProfileOverviewProps {
  userName: string;
  title: string;
  location: string;
  contactInfo: string;
}

 
const ProfileOverview: React.FC<ProfileOverviewProps> = ({userName, title, location, contactInfo}) => {
  return (
    <Flex height="6rem" width="24rem" px="8" py="4">
      <Flex flexGrow="1" justify={'between'} direction={"column"}>
        <Box>
          <Text as="div" size="2" weight="bold">{userName} </Text>
          <Text as="div" size="1" color='gray'>{title}</Text>
        </Box>
        <Box>
          <Text  as="div" size="1" color='gray'>{location}</Text>
        </Box>
      </Flex>
      <Flex direction={"column"} justify={"between"} align={"end"} height={"full"}>
        <DropdownMenu.Root >
          <DropdownMenu.Trigger >
            <IconButton variant="ghost" radius='medium' >
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