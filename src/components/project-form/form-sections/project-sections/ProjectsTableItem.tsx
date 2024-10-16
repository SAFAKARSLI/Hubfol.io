'use client';
import DeleteDialogWithoutHardConfirm from '@/components/DeleteDialogWithoutHardConfirm';
import DeleteSection from '@/components/DeleteSection';
import { Section } from '@/types/section';
import { DotsHorizontalIcon, TrashIcon } from '@radix-ui/react-icons';
import {
  Button,
  DropdownMenu,
  IconButton,
  Select,
  Table,
} from '@radix-ui/themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaEdit } from 'react-icons/fa';

type Props = {
  section: Section;
};

function ProjectsTableItem({ section }: Props) {
  const router = useRouter();
  return (
    <Table.Row className="hover:bg-gray-2">
      <Table.RowHeaderCell>
        <Link
          href={`sections/${section.uuid}`}
          className="text-violet-11 hover:underline font-medium truncate inline-block"
        >
          {section.title}
        </Link>
      </Table.RowHeaderCell>
      <Table.Cell className="text-gray-11 w-[9rem]">
        <p>{section.contentType.replaceAll('_', ' ')}</p>
      </Table.Cell>
      <Table.Cell className="w-10">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <IconButton variant="ghost" color="gray" className="m-auto">
              <DotsHorizontalIcon />
            </IconButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item
              onClick={() => router.push(`sections/${section.uuid}`)}
            >
              <FaEdit /> Edit
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item asChild>
              <DeleteDialogWithoutHardConfirm
                title={`Delete "${section.title}"`}
                description={`Are you sure you want to delete? This will permanently delete the section.`}
                action={<DeleteSection section={section} />}
              />
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Table.Cell>
    </Table.Row>
  );
}

export default ProjectsTableItem;
