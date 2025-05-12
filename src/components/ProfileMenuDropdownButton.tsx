import { useUser } from "@clerk/nextjs";
import { PersonIcon } from "@radix-ui/react-icons";
import { Avatar } from "@radix-ui/themes";
import React from "react";

type Props = {};

function ProfileMenuDropdownButton({}: Props) {
  const { user } = useUser();

  const comp = user ? (
    <Avatar size={"2"} fallback={user!.username![0]} src={user!.imageUrl!} />
  ) : (
    <PersonIcon className="w-6 h-6" />
  );
  return <>{comp}</>;
}

export default ProfileMenuDropdownButton;
