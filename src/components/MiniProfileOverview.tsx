import React from "react";
import HamburgerProjectMenu from "./HamburgerProjectMenu";
import Project from "@/types/project";
import { baseUrl } from "@/utils";
import Employee from "@/types/employee";
import { User } from "@clerk/nextjs/server";
import { getUser } from "@/app/actions/user";
import { auth } from "@clerk/nextjs/server";

type Props = {
  activeProject?: string;
};

async function MiniProfileOverview({}: Props) {
  const { userId } = auth();
  const user = (await getUser(userId!)) as User;

  const projects = (await fetch(
    `${baseUrl}/api/projects?username=${user.username as string}`,
    { cache: "force-cache", next: { tags: ["projects"] } }
  ).then((r) => r.json())) as Project[];

  return (
    <div className={`xl:hidden flex  items-center h-full gap-3`}>
      <HamburgerProjectMenu projects={projects} />
      <div className="text-center overflow-hidden flex-1 w-[8rem]">
        <p className="text-sm font-bold block text-nowrap">{user?.fullName}</p>
        <p className="text-xs  text-gray-400 block">
          {user?.emailAddresses[0].emailAddress}
        </p>
      </div>
    </div>
  );
}

export default MiniProfileOverview;
