"use client";
import React, { useState } from "react";

import {
  DropdownMenu,
  IconButton,
  AlertDialog,
  Dialog,
} from "@radix-ui/themes";

import * as DialogPrimitive from "@radix-ui/react-dialog";

import {
  TrashIcon,
  Pencil2Icon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";

import { useParams } from "next/navigation";

import DeleteProjectDialog from "./dialogs/DeleteProjectDialog";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Project } from "@prisma/client";

type Props = {
  project: Project;
};

function ProjectMenu({ project }: Props) {
  const router = useRouter();
  const { username, projectSlug } = useParams();

  const [deleteDialogeOpen, setDeleteDialogeOpen] = useState(false);

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton variant="ghost" color="gray">
            <DotsHorizontalIcon />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item asChild>
            <Link href={`edit/${project.uuid}`}>
              <Pencil2Icon />
              Edit
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator />

          <DropdownMenu.Item
            color="red"
            onMouseDown={() => setDeleteDialogeOpen(true)}
          >
            <TrashIcon />
            Delete
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <AlertDialog.Root
        open={deleteDialogeOpen}
        onOpenChange={() => {
          if (deleteDialogeOpen) {
            setDeleteDialogeOpen(false);
          }
        }}
      >
        <DeleteProjectDialog project={project} />
      </AlertDialog.Root>
    </>
  );
}

export default ProjectMenu;
