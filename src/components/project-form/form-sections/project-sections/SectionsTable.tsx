'use client';

import React, { useEffect, useState } from 'react';

import { Button, Table } from '@radix-ui/themes';

import Project from '@/types/project';
import ProjectsTableItem from './ProjectsTableItem';
import { PlusIcon } from '@radix-ui/react-icons';
import { baseUrl } from '@/utils';
import { cookies } from 'next/headers';
import { Section } from '@/types/section';
import FormSection from '../FormSection';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

type Props = {
  // sections: Section[];
  editFormData?: (key: string, value: string | Blob) => void;
  actionResponse?: any;
  sectionData?: any;
};

function SectionsTable({ editFormData, actionResponse }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    const fetchSections = async () => {
      const res = await fetch(
        `${baseUrl}/api/sections?projectUUID=${actionResponse[0].data.uuid}`,
        { next: { tags: ['sections'] } }
      ).then((res) => res.json());
      setSections(res);
    };

    fetchSections();
  }, []);

  return (
    <>
      <Table.Root size={'1'}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Header</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Tags</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {sections.map((section, i) => (
            <ProjectsTableItem section={section} key={i} />
          ))}
        </Table.Body>
      </Table.Root>
      <Button
        type="button"
        variant="soft"
        className="w-1/4 my-3 h-[2.5rem] float-right"
        onClick={() => router.push(`${pathname}/sections`)}
      >
        <PlusIcon />
        New Section
      </Button>
    </>
  );
}

export default SectionsTable;
