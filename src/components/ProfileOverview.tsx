import { DotFilledIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Badge, DropdownMenu, Button, IconButton, Text } from '@radix-ui/themes';
import React from 'react';


interface ProfileOverviewProps {
  userName: string;
  title: string;
  location: string;
  contactInfo: string;
}

 
const ProfileOverview: React.FC<ProfileOverviewProps> = ({userName, title, location, contactInfo}) => {
  return (
    <div className="flex z-50 h-[6rem] w-[24rem] px-9 py-4">
      <div className="flex-1 items-center">
            <Text as="div" size="3" weight="bold">{userName} </Text>
            <Text as="div" size="2" color='gray'>{title}</Text>
            <Text  as="div" size="2" color='gray'>{location}</Text>
      </div>
      <div className='flex flex-col justify-between items-center h-full'>
        <DropdownMenu.Root >
          <DropdownMenu.Trigger >
            <IconButton variant="ghost"  className='flex-none w-5 rounded'>
              <DotsHorizontalIcon width="18" height="18" />
            </IconButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content size="1">
            <DropdownMenu.Item>Share</DropdownMenu.Item>
            <DropdownMenu.Item>View full profile</DropdownMenu.Item>


          </DropdownMenu.Content>
        </DropdownMenu.Root> 
        <Badge size="3" className='font-bold' variant="soft" radius='full'>$45/hr</Badge>
      </div>
    </div>
  );
};

export default ProfileOverview;