"use client";
import React from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import { useParams } from "next/navigation";
import { initiateProject } from "@/app/actions/project";
import SubmitButton from "./SubmitButton";
import { Toaster, toast } from "sonner";
import { useUser } from "@clerk/nextjs";

type Props = {};

function AddProjectButton({}: Props) {
  const { username } = useParams();

  const user = useUser();

  if (!user.isSignedIn || user.user?.username != username) {
    return null;
  }

  return (
    <form action={initiateProject}>
      <input type="hidden" name="username" value={username} />
      <SubmitButton
        size="2"
        variant={"soft"}
        style="cursor-pointer rounded h-12 w-full mb-3"
      >
        <PlusIcon /> Add Project
      </SubmitButton>
      <Toaster richColors duration={3000} position="bottom-left" theme="dark" />
    </form>
  );
}

export default AddProjectButton;
