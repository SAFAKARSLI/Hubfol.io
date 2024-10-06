import { PersonIcon } from '@radix-ui/react-icons';
import { Text } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

type Props = {
  icon: React.ReactNode;
  text: string;
  link: string;
};

function SidebarMenuLink({ icon, text, link }: Props) {
  return (
    <Link
      className="flex gap-1 items-center hover:bg-gray-a3 hover:cursor-pointer rounded-md p-1"
      href={link}
    >
      {icon}
      <Text className="text-gray-12 w-full" size={'2'}>
        {text}
      </Text>
    </Link>
  );
}

export default SidebarMenuLink;
