import React from 'react';

import { Button, Table } from '@radix-ui/themes';

import Project from '@/types/project';
import ProjectsTableItem from './ProjectsTableItem';
import { PlusIcon } from '@radix-ui/react-icons';
import { baseUrl } from '@/utils';
import { cookies } from 'next/headers';
import { Section } from '@/types/section';

type Props = {
  sections: Section[];
};

async function SectionsTable({ sections }: Props) {
  return (
    <div>
      <Table.Root size={'1'}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Header</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Tags</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {sections!.map((section, i) => (
            <ProjectsTableItem section={section} key={i} />
          ))}
        </Table.Body>
      </Table.Root>
      <Button variant="soft" className="w-1/4 my-3 h-[2.5rem] float-right">
        <PlusIcon />
        New Section
      </Button>
    </div>
  );
}

export default SectionsTable;
