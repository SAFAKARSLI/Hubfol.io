"use client";
import React from "react";
import { Avatar, Separator } from "@radix-ui/themes";
import { Cross2Icon, RocketIcon } from "@radix-ui/react-icons";
import { baseUrl } from "@/utils";
import SidebarMenuLink from "../SidebarMenuLink";
import SignOutButton from "../SignOutButton";
import * as Portal from "@radix-ui/react-portal";
import SidebarProfileOverview from "../SidebarProfileOverview";
import { useUser } from "@clerk/nextjs";

type Props = {};

function ProfileSidebarButton({}: Props) {
  const { user } = useUser();
  const [visible, setVisible] = React.useState(false);
  const menuPosition = "right-0";
  const menuSlideAnimation = visible ? "translate-x-0" : "translate-x-full";
  return (
    <div>
      <div
        className="hover:border-gray-6 border border-gray-1 rounded-md overflow-hidden hover:cursor-pointer"
        onClick={() => setVisible(!visible)}
      >
        <Avatar
          className="h-8 w-8"
          fallback={user?.username!}
          src={user?.imageUrl}
        />
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
          className={`flex flex-col p-5 fixed bottom-0 ${menuPosition} ${menuSlideAnimation} h-full bg-gray-2 border border-gray-4 w-[18rem] duration-300 `}
        >
          <div className="flex justify-end">
            <Cross2Icon
              onClick={() => setVisible(false)}
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
              onClick={() => setVisible(false)}
            />
          </div>
          <Separator size={"4"} className="my-5" />

          <SignOutButton />
        </div>
      </Portal.Root>
    </div>
  );
}

export default ProfileSidebarButton;
