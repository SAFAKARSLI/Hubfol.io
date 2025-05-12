import { useUser } from "@clerk/nextjs";
import { Avatar, Heading, Text } from "@radix-ui/themes";
import React from "react";

type Props = {};

function SidebarProfileOverview({}: Props) {
  const { user } = useUser();

  return (
    <div
      // onClick={() => setVisible(false)}
      className="flex h-10"
    >
      <Avatar
        className="mr-3"
        height={32}
        width={32}
        fallback={user?.username!}
        src={user?.imageUrl}
      />
      <div className="flex flex-col justify-between">
        <Heading size={"3"}>{user?.fullName}</Heading>
        <Text color="gray" size={"2"}>
          {user?.username}
        </Text>
      </div>
    </div>
  );
}

export default SidebarProfileOverview;
