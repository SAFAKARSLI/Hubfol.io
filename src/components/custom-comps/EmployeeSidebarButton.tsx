"use client";
import React from "react";
import { Avatar, IconButton, Separator } from "@radix-ui/themes";
import {
  Cross2Icon,
  HamburgerMenuIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import { baseUrl } from "@/utils";
import SidebarMenuLink from "../SidebarMenuLink";
import SignOutButton from "../SignOutButton";
import * as Portal from "@radix-ui/react-portal";
import SidebarProfileOverview from "../SidebarProfileOverview";
import { useUser } from "@clerk/nextjs";
import ProjectsSidePanel from "../ProjectsSidePanel";
import { Employee, Project } from "@prisma/client";
import AddProjectButton from "../AddProjectButton";
import AccordionProjectList from "../AccordionProjectList";
import ProfileOverview from "../ProfileOverview";
import ProjectListHeader from "../ProjectListHeader";
import { useParams } from "next/navigation";
type Props = {
  projects: Project[];
  user: Employee;
};

function EmployeeSidebarButton({ projects, user }: Props) {
  const { projectSlug } = useParams();
  const [visible, setVisible] = React.useState(false);
  const menuPosition = "left-0";
  const menuSlideAnimation = visible ? "translate-x-0" : "-translate-x-full";
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
          className={`flex flex-col fixed bottom-0 ${menuPosition} ${menuSlideAnimation} h-full bg-gray-2 border border-gray-4 w-[25rem] duration-300 `}
        >
          <div className="flex flex-col h-[100dvh] w-full">
            <ProfileOverview user={user} />
            <div className=" flex-1  scroll-smooth overflow-y-auto">
              <ProjectListHeader projectCount={projects.length} />
              <AccordionProjectList
                initialProjects={projects as Project[]}
                activeProjectId={projectSlug as string}
              />
              <div className="mb-[15rem] p-5">
                {user?.username == user?.username && (
                  <AddProjectButton projectCount={projects.length} />
                )}
              </div>
            </div>
          </div>
        </div>
      </Portal.Root>
    </div>
  );
}

export default EmployeeSidebarButton;
