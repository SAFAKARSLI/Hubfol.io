import ProjectForm from "@/components/project-form/ProjectForm";
import { SlugProps } from "@/types/slug";
import { auth } from "@clerk/nextjs/server";
import React from "react";

async function page({}: SlugProps) {
  auth().protect();
  return <ProjectForm activeStepIndex={0} />;
}

export default page;
