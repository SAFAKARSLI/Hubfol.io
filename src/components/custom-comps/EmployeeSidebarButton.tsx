"use client";
import React, { useEffect } from "react";
import { IconButton } from "@radix-ui/themes";
import { Cross2Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import * as Portal from "@radix-ui/react-portal";

import ProjectsSidePanel from "../ProjectsSidePanel";
import { useParams, usePathname } from "next/navigation";
import Employee from "@/types/employee";
import Project from "@/types/project";
import Section from "@/types/section";

type Props = {
  projects: Project[];
  user: Employee;
};

function EmployeeSidebarButton({ projects, user }: Props) {
  const [visible, setVisible] = React.useState(false);
  const { username } = useParams();
  const menuPosition = "left-0";
  const pathname = usePathname();
  const menuSlideAnimation = visible ? "translate-x-0" : "-translate-x-full";
  const { projectSlug } = useParams();

  useEffect(() => {
    const onVisitClosePanel = ["account", "edit", "new", "projects"];
    if (onVisitClosePanel.some((path) => pathname.includes(path))) {
      setVisible(false);
    }
  }, [pathname]);

  return (
    <div>
      <div
        className="hover:border-gray-6 border border-gray-1 rounded-md overflow-hidden hover:cursor-pointer xl:hidden"
        onClick={() => setVisible(!visible)}
      >
        <IconButton variant="surface" size={"2"}>
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
          className={`flex flex-col fixed bottom-0 ${menuPosition} ${menuSlideAnimation} h-full bg-gray-1 border border-gray-4 w-full  sm:w-[27rem] duration-300 `}
        >
          <div className="flex justify-end z-10">
            <Cross2Icon
              onClick={() => setVisible(false)}
              className="hover:bg-gray-3 p-[3px] h-6 w-6 rounded-md hover:cursor-pointer  m-2"
              color="gray"
            />
          </div>
          <ProjectsSidePanel
            username={username as string}
            projects={projects}
            user={user}
            projectSlug={projectSlug as string}
            sections={null}
          />
        </div>
      </Portal.Root>
    </div>
  );
}

export default EmployeeSidebarButton;
