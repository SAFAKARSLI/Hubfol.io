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
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { initiateSection } from '@/app/actions/section';
import next from 'next';

type Props = {
  // sections: Section[];
};

function SectionsTable({}: Props) {
  const [sections, setSections] = useState<Section[]>([]);
  const init = useSearchParams().get('initialize');
  const router = useRouter();
  const { userUUID, projectUUID } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (init) {
      return;
    }

    const fetchSections = async () => {
      const response = await fetch(
        `${baseUrl}/api/sections?projectUUID=${projectUUID}`,
        { next: { tags: ['sections'] } }
      );
      const data = await response.json();
      setSections(data);
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
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {sections.map((section, i) => (
            <ProjectsTableItem section={section} key={i} />
          ))}
          <Table.Row></Table.Row>
        </Table.Body>
      </Table.Root>
      <Button
        type="button"
        variant="soft"
        className="w-1/4 my-3 h-[2.5rem] float-right"
        loading={loading}
        onClick={async () => {
          setLoading(true);
          const newSection = await initiateSection(projectUUID as string);
          if (!newSection || newSection.status != 200) {
            router.push(`/u/${userUUID}/projects?error=section-failure`);
          }
          router.push(
            `/u/${userUUID}/projects/${projectUUID}/sections/${
              newSection!.data!.uuid
            }?initialize=true`
          );
          // setSections([...sections, newSection.data!]);
        }}
      >
        <PlusIcon />
        New Section
      </Button>
    </>
  );
}

export default SectionsTable;
