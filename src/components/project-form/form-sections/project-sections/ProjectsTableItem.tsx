import { Section } from '@/types/project';
import { Table } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

type Props = {
  section: Section;
};

function ProjectsTableItem({ section }: Props) {
  return (
    <Table.Row className="hover:bg-gray-2">
      <Table.RowHeaderCell>
        <Link
          href={''}
          className="text-violet-11 hover:underline font-medium w-1/3 truncate"
        >
          {section.header}
        </Link>
      </Table.RowHeaderCell>
      <Table.Cell className="text-gray-11 w-1/3">
        <div>{section.contentType}</div>
      </Table.Cell>
      <Table.Cell className="text-gray-11 w-1/3 truncate">[Tags]</Table.Cell>
    </Table.Row>
  );
}

export default ProjectsTableItem;
