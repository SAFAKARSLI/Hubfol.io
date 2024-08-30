import React, { useEffect, useState } from 'react';

import * as Accordion from '@radix-ui/react-accordion';
import ProjectSubsection from './ProjectSubsection';
import Divider from './subsections/Divider';

import {
  Box,
  DropdownMenu,
  IconButton,
  Text,
  AlertDialog,
  Button,
  Flex,
  Table,
  Inset,
} from '@radix-ui/themes';
import {
  DotsHorizontalIcon,
  TrashIcon,
  Pencil2Icon,
} from '@radix-ui/react-icons';

import Image from 'next/image';

import { Section } from '@/models/project';
import { deleteProject } from '@/app/actions';
import { redirect } from 'next/navigation';

interface ProjectCardProps {
  _id: string;
  title: string;
  tagline: string;
  iconLink: string | ArrayBuffer;
  sections: Section[] | null;
  activeProjectId: string;
}

const ProjectCard = ({
  _id,
  title,
  tagline,
  iconLink,
  sections,
  activeProjectId,
}: ProjectCardProps) => {
  const [deleteDialogeOpen, setDeleteDialogeOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState('');

  return (
    <Accordion.Item value={_id} asChild>
      <Box
        className="
      mx-5
      mb-5
      rounded
      border
      border-gray-4
      overflow-hidden"
      >
        <Accordion.Trigger asChild>
          <div
            className={`flex py-4 px-8 
          bg-gray-1 data-[state=open]:bg-gray-2 hover:bg-gray-2
          data-[state=closed]:cursor-pointer `}
          >
            <div className="flex justify-between w-full items-center gap-x-8">
              <Image
                width={'40'}
                height="40"
                alt={`${title}-icon`}
                src={iconLink as string}
              />

              <div className="gap-y-1 flex-1 flex flex-col">
                <Text weight={'bold'} size={'3'}>
                  {title}
                </Text>
                <Text size={'1'}>{tagline}</Text>
              </div>
            </div>
            {_id === activeProjectId && (
              <div className="h-full flex-none">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <IconButton variant="ghost" color="gray" asChild>
                      <DotsHorizontalIcon />
                    </IconButton>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Item onSelect={() => console.log('Edit')}>
                      <Pencil2Icon />
                      Edit
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      color="red"
                      onSelect={() => setDeleteDialogeOpen(true)}
                    >
                      <TrashIcon />
                      Delete
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
                <AlertDialog.Root
                  onOpenChange={() => {
                    setDeleteDialogeOpen(false);
                    setConfirmDelete('');
                  }}
                  open={deleteDialogeOpen}
                >
                  <AlertDialog.Content maxWidth="500px">
                    <AlertDialog.Title>Delete `{title}`</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                      Are you sure you want to delete the <b>`{title}`</b>? This
                      action is permanent and cannot be undone. <br /> <br />
                      To confirm deletion, type{' '}
                      <b>
                        <i>{title}</i>
                      </b>{' '}
                      in the input below.
                    </AlertDialog.Description>
                    <input
                      value={confirmDelete}
                      onChange={(e) => setConfirmDelete(e.target.value)}
                      className="w-full text-sm px-2 p-1 border text border-gray-4 rounded my-3 focus:outline-none"
                    />
                    <Flex gap="3" justify="end">
                      <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                          Cancel
                        </Button>
                      </AlertDialog.Cancel>
                      <AlertDialog.Action>
                        <Button
                          color="red"
                          disabled={title != confirmDelete}
                          onClick={() => {
                            deleteProject(_id);
                          }}
                        >
                          Delete project
                        </Button>
                      </AlertDialog.Action>
                    </Flex>
                  </AlertDialog.Content>
                </AlertDialog.Root>
              </div>
            )}
          </div>
        </Accordion.Trigger>

        <Accordion.Content asChild>
          <div
            className="project-content w-full bg-gray-1 text-hubfolio-subtext rounded-b 
          data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden px-6 "
          >
            {sections?.map((s, i) => {
              return (
                <div key={i}>
                  <ProjectSubsection
                    title={s.title}
                    contentType={s.contentType}
                    content={s.content}
                  />
                  {i == sections.length - 1 ? null : <Divider />}
                </div>
              );
            })}
          </div>
        </Accordion.Content>
      </Box>
    </Accordion.Item>
  );
};

export default ProjectCard;
