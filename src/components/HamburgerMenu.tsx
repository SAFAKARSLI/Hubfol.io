import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import {
  Button,
  DropdownMenu,
  Heading,
  IconButton,
  Text,
} from '@radix-ui/themes';
import React from 'react';
import { getProjects, getUser, openProject } from '@/app/actions';
import Project from '@/types/project';
import Image from 'next/image';
import { WithId } from 'mongodb';
import { User } from 'next-auth';
import ProjectCard from './ProjectCard';

type Props = {
  userUUID: string;
  activeProject?: string;
};

async function HamburgerMenu({ userUUID }: Props) {
  const user = (await getUser(userUUID)) as WithId<User>;
  const projects = await getProjects(userUUID);

  const renderProjects = () => {
    return projects.map((project: Project) => {
      return (
        <DropdownMenu.Item key={project.projectUUID} asChild>
          <ProjectCard project={project} userUUID={userUUID} />
        </DropdownMenu.Item>
      );
    });
  };

  return (
    <div className="xl:hidden h-3/4 w-[15rem] bg-violet-2 rounded border border-violet-6 p-3 flex justify-between items-center">
      <div className="flex flex-col ">
        <Text className="text-sm font-bold ">{user.name}</Text>
        <Text className="text-xs" color="gray">
          {user.title}
        </Text>
      </div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton variant="soft" size={'3'} className="-xl:flex  hidden">
            <HamburgerMenuIcon />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <div className="flex flex-col gap-2 w-[16rem]">
            {renderProjects()}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}

export default HamburgerMenu;
