"use client";
import React, { useEffect, useRef, useState } from "react";
import Project from "@/types/project";
import * as Accordion from "@radix-ui/react-accordion";
import AccordionProjectItem from "./AccordionProjectItem";
import { Button, IconButton } from "@radix-ui/themes";
import * as Portal from "@radix-ui/react-portal";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { preferredColorOptions } from "@/utils";
import Section from "@/types/section";

type Props = {
  project: Project;
  sections: Section[];
};

function ProjectConsole({ project, sections }: Props) {
  const [isConsoleOpen, setConsoleOpen] = useState(false);
  const consoleRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   setConsoleOpen(true);
  // }, []);

  const handleConsoleOpen = () => {
    setConsoleOpen(!isConsoleOpen);
  };

  return (
    <div ref={consoleRef}>
      <Portal.Root container={consoleRef.current}>
        <div
          className={`fixed top-0 left-0 right-0 bottom-0 bg-violet-a13 ${
            !isConsoleOpen && "hidden"
          }`}
          onClick={() => setConsoleOpen(false)}
        ></div>
      </Portal.Root>

      <Portal.Root container={consoleRef.current}>
        <div key={project.slug}>
          <Accordion.Root
            type="single"
            value={isConsoleOpen ? project.slug : ""}
            className={`xl:hidden w-[25rem] fixed right-0  
     -sm:w-full bottom-0  flex flex-col justify-end duration-300 overflow-hidden rounded`}
          >
            <Accordion.Item value={project.slug!}>
              <Accordion.Trigger asChild>
                <Button
                  color={"indigo"}
                  className="rounded-t rounded-b-none h-[1.8rem] w-full font-semibold"
                  size={"1"}
                  onClick={handleConsoleOpen}
                >
                  {isConsoleOpen ? (
                    <>
                      <ChevronDownIcon /> Close Console
                    </>
                  ) : (
                    <div className="flex gap-1 m-auto">
                      <ChevronUpIcon /> View Project Info
                    </div>
                  )}
                </Button>
              </Accordion.Trigger>
              <Accordion.Content className="bg-gray-1 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
                <Accordion.Root type="single" value={project.slug} asChild>
                  <div
                    className={` bg-gray-1  border-x border-violet-a3 duration-300  `}
                  >
                    <AccordionProjectItem
                      project={project}
                      activeProjectId={project.slug}
                      sections={sections}
                    />
                  </div>
                </Accordion.Root>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
          {/* <div
    className={`xl:hidden fixed left-0 top-0 right-0 bottom-0 bg-violet-a13 ${
      !isConsoleOpen && 'hidden'
    }`}
    onClick={() => setConsoleOpen(false)}
  /> */}
        </div>
      </Portal.Root>
    </div>
  );
}

export default ProjectConsole;
