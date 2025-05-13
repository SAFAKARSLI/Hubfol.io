import React from "react";

import Projects from "@/components/pages/Projects";
import { SlugProps } from "@/types/slug";
import NoActiveProjectBanner from "@/components/NoActiveProjectBanner";
import { notFound } from "next/navigation";
import { isValidUsername } from "@/utils";

export default async function page({ params, searchParams }: SlugProps) {
  const { username } = params;

  if (!isValidUsername(username)) {
    notFound();
  }

  return (
    <Projects username={username}>
      <NoActiveProjectBanner error={searchParams!.error} />
    </Projects>
  );
}
