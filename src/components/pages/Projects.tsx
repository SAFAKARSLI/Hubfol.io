import React, { cloneElement } from "react";
import Project from "@/types/project";
import ProjectsSidePanel from "../ProjectsSidePanel";
import { notFound, redirect } from "next/navigation";
import { baseUrl, isValidUsername } from "@/utils";

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

  const user = await fetch(`${baseUrl}/api/users/${username}`, {
    next: { tags: ["users"] },
  }).then((r) => r.json());

  var projects = await fetch(`${baseUrl}/api/projects?username=${username}`, {
    next: {
      tags: ["projects", "sections"],
    },
  })
    .then((r) => {
      if (r.status === 404) notFound();
      if (r.status === 200) {
        return r.json();
      }
    })
    .catch((e) => {
      console.error("Error fetching projects:", e);
    });

  let project: Project | undefined;
  if (activeProjectId) {
    project = projects.find(
      (project: Project) => project.slug === activeProjectId
    );

    if (!project) notFound();
  }

  return (
    <div className="flex ">
      <div className="flex-none border-r border-gray-4 bg-gray-1 hidden xl:block">
        <ProjectsSidePanel
          username={username}
          projects={projects}
          user={user}
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
