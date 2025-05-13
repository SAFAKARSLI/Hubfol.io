"use client";
import React from "react";
import { IconButton } from "@radix-ui/themes";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import * as Portal from "@radix-ui/react-portal";

import ProjectsSidePanel from "../ProjectsSidePanel";
import { useParams } from "next/navigation";
import Employee from "@/types/employee";
import Project from "@/types/project";

type Props = {
  projects: Project[];
  user: Employee;
};

function EmployeeSidebarButton({ projects, user }: Props) {
  const [visible, setVisible] = React.useState(false);
  const { username } = useParams();
  const menuPosition = "left-0";
  const menuSlideAnimation = visible ? "translate-x-0" : "-translate-x-full";
  const { projectSlug } = useParams();
  return (
    <div>
      <div
        className="hover:border-gray-6 border border-gray-1 rounded-md overflow-hidden hover:cursor-pointer xl:hidden"
        onClick={() => setVisible(!visible)}
      >
        <IconButton variant="surface">
          <HamburgerMenuIcon />
        </IconButton>
      </div>
      <Portal.Root>
        <div
          className={` fixed left-0 top-0 right-0 bottom-0 bg-violet-a13  ${
            !visible && "hidden"
          }`}
          onClick={() => setVisible(false)}
        />
      </Portal.Root>

      <Portal.Root>
        <div
          className={`flex flex-col fixed bottom-0 ${menuPosition} ${menuSlideAnimation} h-full bg-gray-2 border border-gray-4 w-[27.1rem] duration-300 `}
        >
          <ProjectsSidePanel
            username={username as string}
            projects={projects}
            user={user}
            projectSlug={projectSlug as string}
          />
        </div>
      </Portal.Root>
    </div>
  );
}

export default EmployeeSidebarButton;
