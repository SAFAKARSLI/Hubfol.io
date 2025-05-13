import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import AccordionProjectItem from "./AccordionProjectItem";
import Project from "@/types/project";
import { baseUrl } from "@/utils";
import Section from "@/types/section";

type Props = {
  projects: Project[];
  activeProjectId: string;
  sections: Section[] | null;
};

function AccordionProjectList({ projects, activeProjectId, sections }: Props) {
  return (
    <Accordion.Root
      type="single"
      value={activeProjectId ?? "NO_ACTIVE_PROJECT"}
      asChild
    >
      <div className="px-5 flex flex-col gap-4">
        {projects.map((p, i) => {
          return (
            <AccordionProjectItem
              key={i}
              activeProjectId={activeProjectId}
              project={p}
              sections={sections}
            />
          );
        })}
      </div>
    </Accordion.Root>
  );
}

export default AccordionProjectList;
