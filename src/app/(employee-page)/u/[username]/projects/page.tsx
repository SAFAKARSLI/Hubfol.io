import React from "react";

import Projects from "@/components/pages/Projects";
import { SlugProps } from "@/types/slug";
import NoActiveProjectBanner from "@/components/NoActiveProjectBanner";
import toast from "react-hot-toast";

export default async function page({ params, searchParams }: SlugProps) {
  const { username } = params;

  return (
    <Projects username={username}>
      <NoActiveProjectBanner error={searchParams!.error} />
    </Projects>
  );
}
