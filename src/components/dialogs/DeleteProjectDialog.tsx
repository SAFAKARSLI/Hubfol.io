import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  TextField,
  Flex,
  Button,
  IconButton,
  Em,
} from "@radix-ui/themes";
import { deleteProject } from "@/app/actions/project";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Project } from "@prisma/client";

type Props = {
  project: Project;
};

function DeleteProjectDialog({ project: { name, uuid } }: Props) {
  const [confirmDelete, setConfirmDelete] = useState("");
  const [isDeleting, setIsDeleting] = useState<true | undefined>(undefined);

  return (
    <>
      <AlertDialog.Content maxWidth="500px" forceMount={isDeleting}>
        <Flex className="w-full justify-between h-[3rem]">
          <AlertDialog.Title size={"5"} className="truncate">
            Delete <p className="inline text-violet-11">{name}</p>
          </AlertDialog.Title>
          <AlertDialog.Cancel disabled={isDeleting}>
            <IconButton variant="ghost" color="gray">
              <Cross1Icon />
            </IconButton>
          </AlertDialog.Cancel>
        </Flex>
        <AlertDialog.Description size="2">
          Are you sure you want to delete the <b>`{name}`</b>? This action is
          permanent and cannot be undone. All of the associated sections will
          also be deleted.
          <br /> <br />
          To confirm deletion, type{" "}
          <b>
            <i>{name}</i>
          </b>{" "}
          in the input below.
        </AlertDialog.Description>
        <TextField.Root
          value={confirmDelete}
          onChange={(e) => setConfirmDelete(e.target.value)}
          placeholder={name}
          size={"3"}
          className="w-full text-m my-3"
        />
        <Flex gap="3" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray" disabled={isDeleting}>
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <Button
            color="red"
            disabled={name != confirmDelete || isDeleting}
            onClick={async () => {
              setIsDeleting(true);
              await deleteProject(uuid);
            }}
            loading={isDeleting}
          >
            Delete project
          </Button>
        </Flex>
      </AlertDialog.Content>
    </>
  );
}

export default DeleteProjectDialog;
