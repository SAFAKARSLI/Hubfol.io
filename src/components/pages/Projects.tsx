import React, { cloneElement } from "react";
import Project from "@/types/project";
import ProjectsSidePanel from "../ProjectsSidePanel";
import { notFound, redirect } from "next/navigation";
import { baseUrl, isValidUsername } from "@/utils";
import { baseMenuRadioItemPropDefs } from "@radix-ui/themes/dist/cjs/components/base-menu.props";

interface ProjectsProps {
  username: string;
  children?: React.ReactNode;
  activeProjectId?: string;
}

const Projects = async ({
  username,
  children,
  activeProjectId,
}: ProjectsProps) => {
  if (!isValidUsername(username)) {
    notFound();
  }

  var projects = await fetch(`${baseUrl}/api/projects?username=${username}`, {
    next: {
      tags: ["projects", "sections"],
    },
  }).then((r) => {
    if (r.status === 404) notFound();
    if (r.body) return r.json();
  });

  let project: Project | undefined;
  if (activeProjectId) {
    project = projects.find(
      (project: Project) => project.slug === activeProjectId
    );

    if (!project) redirect(`/u/${username}/projects?error=project-not-found`);
  }

  return (
    <div className="flex ">
      <div className="flex-none border-r border-gray-4 bg-gray-1">
        <ProjectsSidePanel
          initialProjects={projects}
          username={username}
          projectSlug={activeProjectId as string}
        />
      </div>

      <div className="flex-1 bg-gray-0 relative">
        {cloneElement(children as React.ReactElement, { project })}
      </div>
    </div>
  );
};

export default Projects;
