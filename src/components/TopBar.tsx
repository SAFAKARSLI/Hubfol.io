import React from "react";
import { Flex, Progress, Separator, Spinner } from "@radix-ui/themes";
import { Params } from "@/types/slug";
import NavigationLinks from "./NavigationLinks";
import { auth } from "@clerk/nextjs/server";
import { getUser } from "@/app/actions/user";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import AuthenticationButtonsWrapper from "./AuthenticationButtonsWrapper";
import ProfileSidebarButton from "./custom-comps/ProfileSidebarButton";
import EmployeeSidebarButton from "./custom-comps/EmployeeSidebarButton";
import { baseUrl } from "@/utils";
import Project from "@/types/project";
import Employee from "@/types/employee";

interface TopBarProps {
  params: Params;
}

async function TopBar({ params }: TopBarProps) {
  const { username, projectSlug } = params;
  const { userId } = auth();
  const clerkUser = await getUser(userId as string);

  const user = (await fetch(`${baseUrl}/api/users/${username}`, {
    next: { tags: ["users"] },
  }).then((r) => r.json())) as Employee;

  const projects = (await fetch(
    `${baseUrl}/api/projects?username=${username}`,
    { next: { tags: ["projects"] } }
  ).then((r) => r.json())) as Project[];

  return (
    <>
      <Flex className="border-b border-gray-5 bg-gray-0 justify-end items-center h-[3.5rem] px-2">
        <div className="flex justify-between w-full items-center">
          <div className="hidden xl:flex">
            <NavigationLinks authenticated={clerkUser?.username == username} />
          </div>
          <EmployeeSidebarButton projects={projects} user={user} />

          <Flex align={"center"}>
            <ClerkLoading>
              <Spinner />
            </ClerkLoading>
            <ClerkLoaded>
              {clerkUser ? (
                <>
                  <Separator orientation="vertical" size="1" className="mx-5" />

                  <ProfileSidebarButton />
                </>
              ) : (
                <AuthenticationButtonsWrapper />
              )}
            </ClerkLoaded>
          </Flex>
        </div>
      </Flex>
    </>
  );
}

export default TopBar;
