'use client';
import { Section } from '@/types/section';
import { Table } from '@radix-ui/themes';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

type Props = {
  section: Section;
};

function ProjectsTableItem({ section }: Props) {
  return (
    <Table.Row className="hover:bg-gray-2">
      <Table.RowHeaderCell>
        <Link
          href={`initiate/sections/${section.uuid}`}
          className="text-violet-11 hover:underline font-medium truncate w-1/3"
        >
          {section.title}
        </Link>
      </Table.RowHeaderCell>
      <Table.Cell className="text-gray-11 w-1/3">
        <div>{section.contentType}</div>
      </Table.Cell>
      <Table.Cell className="text-gray-11 w-1/3">[Tags]</Table.Cell>
    </Table.Row>
  );
}

export default ProjectsTableItem;
