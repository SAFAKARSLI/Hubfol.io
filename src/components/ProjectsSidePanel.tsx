import React from "react";
import AccordionProjectList from "./AccordionProjectList";
import ProjectListHeader from "./ProjectListHeader";
import AddProjectButton from "./AddProjectButton";

import ProfileOverview from "./ProfileOverview";
import { Employee, Project } from "@prisma/client";
import { baseUrl } from "@/utils";

type Props = {
  initialProjects: Project[];
  username: string;
  projectSlug: string;
};

async function ProjectsSidePanel({
  initialProjects,
  username,
  projectSlug,
}: Props) {
  const user = (await fetch(`${baseUrl}/api/users/${username}`, {
    cache: "force-cache",
    next: { tags: ["users"] },
  }).then((r) => r.json())) as Employee;

  return (
    <div className="flex flex-col h-[100dvh] hidden lg:flex lg:w-[27rem] ">
      <ProfileOverview user={user} />
      <div className="overflow-y-scroll flex-1  scroll-smooth ">
        <ProjectListHeader projectCount={initialProjects.length} />
        <AccordionProjectList
          initialProjects={initialProjects}
          activeProjectId={projectSlug as string}
        />
        <div className="mb-[15rem] p-5">
          {user?.username == username && (
            <AddProjectButton projectCount={initialProjects.length} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectsSidePanel;
