"use client";

import { Cross2Icon } from "@radix-ui/react-icons";

import { baseUrl } from "@/utils";
import { useUser } from "@clerk/nextjs";
import SignOutButton from "./SignOutButton";
import { Separator } from "@radix-ui/themes";
import SidebarMenuLink from "./SidebarMenuLink";
import { RocketIcon } from "@radix-ui/react-icons";
import SidebarProfileOverview from "./SidebarProfileOverview";

export default function ProfileSidebarContent({
  setVisible,
}: {
  setVisible?: (visible: boolean) => void;
}) {
  const { user } = useUser();

  return (
    <div>
      <div className="flex justify-end">
        <Cross2Icon
          onClick={() => setVisible!(false)}
          className="hover:bg-gray-3 p-[3px] h-6 w-6 rounded-md hover:cursor-pointer"
          color="gray"
        />
      </div>
      <SidebarProfileOverview />
      <Separator size={"4"} className="my-5" />
      <div className="flex flex-col gap-1">
        <SidebarMenuLink
          icon={<RocketIcon color="gray" className="w-5 h-5" />}
          text="My Projects"
          link={`${baseUrl}/u/${user?.username}/projects`}
          onClick={() => setVisible!(false)}
        />
      </div>
      <Separator size={"4"} className="my-5" />

      <SignOutButton />
    </div>
  );
}
