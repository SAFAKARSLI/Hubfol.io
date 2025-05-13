import React from "react";
import AccordionProjectList from "./AccordionProjectList";
import ProjectListHeader from "./ProjectListHeader";
import AddProjectButton from "./AddProjectButton";

import ProfileOverview from "./ProfileOverview";
import { currentUser } from "@clerk/nextjs/server";
import Project from "@/types/project";
import Employee from "@/types/employee";
import Section from "@/types/section";

type Props = {
  projects: Project[];
  user: Employee;
  username: string;
  projectSlug: string;
  sections: Section[] | null;
};

function ProjectsSidePanel({
  projects,
  user,
  projectSlug,
  username,
  sections,
}: Props) {
  return (
    <div className="flex flex-col h-[100dvh]">
      <ProfileOverview user={user} />
      <div className="overflow-y-scroll flex-1  scroll-smooth ">
        <ProjectListHeader projectCount={projects.length} />
        <AccordionProjectList
          activeProjectId={projectSlug as string}
          projects={projects}
          sections={sections}
        />
        <div className="mb-[15rem] p-5">
          <AddProjectButton />
        </div>
      </div>
    </div>
  );
}

export default ProjectsSidePanel;
