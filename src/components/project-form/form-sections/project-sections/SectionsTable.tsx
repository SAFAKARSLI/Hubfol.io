"use client";

import React, { useEffect, useState } from "react";

import { Button, Table } from "@radix-ui/themes";

import ProjectsTableItem from "./ProjectsTableItem";
import { PlusIcon } from "@radix-ui/react-icons";
import { baseUrl } from "@/utils";
import Section from "@/types/section";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast, Toaster } from "sonner";

type Props = {
  // sections: Section[];
};

function SectionsTable({}: Props) {
  const [sections, setSections] = useState<Section[]>([]);
  const init = useSearchParams().get("initialize");
  const router = useRouter();
  const { projectUUID } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSections = async () => {
      const response = await fetch(
        `${baseUrl}/api/sections?projectUUID=${projectUUID}`,
        { next: { tags: ["sections"] } }
      );
      const data = await response.json();
      setSections(data);
    };

    if (!init) fetchSections();
  }, [projectUUID]);

  useEffect(() => {
    if (sections.length == 0 || init) setLoading(false);
  }, [sections]);

  return (
    <>
      <Table.Root size={"1"}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
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
        className="w-full sm:w-1/4 h-[2.5rem]"
        loading={loading}
        onClick={() => {
          if (sections.length >= 10) {
            toast.error("You've reached the maximum number of sections.");
            return;
          }
          setLoading(true);
          router.push(`sections/new`);
        }}
      >
        <PlusIcon />
        New Section
      </Button>
      <Toaster richColors duration={3000} position="bottom-left" theme="dark" />
    </>
  );
}

export default SectionsTable;
