import React from "react";
import AccordionProjectList from "./AccordionProjectList";
import ProjectListHeader from "./ProjectListHeader";
import AddProjectButton from "./AddProjectButton";

import ProfileOverview from "./ProfileOverview";
import { currentUser } from "@clerk/nextjs/server";
import Project from "@/types/project";
import Employee from "@/types/employee";

type Props = {
  projects: Project[];
  user: Employee;
  username: string;
  projectSlug: string;
};

function ProjectsSidePanel({ projects, user, projectSlug, username }: Props) {
  return (
    <div className="flex flex-col h-[100dvh] hidden lg:flex lg:w-[27rem] ">
      <ProfileOverview user={user} />
      <div className="overflow-y-scroll flex-1  scroll-smooth ">
        <ProjectListHeader projectCount={projects.length} />
        <AccordionProjectList
          activeProjectId={projectSlug as string}
          projects={projects}
        />
        <div className="mb-[15rem] p-5">
          <AddProjectButton />
        </div>
      </div>
    </div>
  );
}

export default ProjectsSidePanel;
