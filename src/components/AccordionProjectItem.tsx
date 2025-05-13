"use client";
import * as Accordion from "@radix-ui/react-accordion";
import {
  Text,
  Heading,
  ScrollArea,
  Separator,
  Spinner,
} from "@radix-ui/themes";
import ProjectMenu from "./ProjectMenu";
import { useEffect, useRef, useState } from "react";
import { baseUrl, defaultIconLink } from "@/utils";
import Section from "@/types/section";
import Subsection from "./project-card-subsections/Subsection";
import { useUser } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import Project from "@/types/project";

interface AccordionProjectItemProps {
  activeProjectId: string;
  project: Project;
  sections: Section[] | null;
}

const AccordionProjectItem = ({
  activeProjectId,
  project,
  sections,
}: AccordionProjectItemProps) => {
  const { name, tagline, iconLink, uuid, slug } = project;
  const { username } = useParams();
  const { user } = useUser();
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  function renderSections() {
    if (sections && sections?.length > 0) {
      return (
        <div className="p-6">
          {sections?.map((s, i) => {
            return (
              <Subsection
                key={i}
                title={s.title}
                description={s.description}
                contentType={s.contentType}
                content={s.content}
              />
            );
          })}
        </div>
      );
    } else if (sections && sections?.length == 0) {
      return (
        <Text size="2" as="p" className="italic text-gray-10 text-sm p-6">
          No section found
        </Text>
      );
    } else {
      return null;
    }
  }

  return (
    <Accordion.Item value={slug} asChild>
      <div
        className={`rounded data-[state=open]:border overflow-hidden data-[state=open]:shadow-gray-0 border-gray-3 data-[state=open]:shadow-lg w-full m-auto`}
      >
        <Accordion.Trigger asChild>
          <div
            className={`flex sm:px-7 px-4 
          ${activeProjectId == slug && "bg-gray-2"} bg-gray-1 hover:bg-gray-2
          data-[state=closed]:cursor-pointer w-full items-center h-[4.5rem]`}
            ref={cardRef}
            onClick={() => {
              if (activeProjectId !== slug) {
                setLoading(true);
                router.push(`/u/${username}/projects/${slug}`);
                setLoading(false);
              }
            }}
          >
            <img
              className="h-[2.3rem] w-[2.3rem] rounded-sm "
              style={{ objectFit: "contain" }}
              alt={`${name}-icon`}
              src={
                iconLink
                  ? "https://s3.us-east-1.amazonaws.com/hubfol.io.project-icons/" +
                    (iconLink as string)
                  : defaultIconLink
              }
            />

            <div className="min-w-[5rem] sm:mx-7 mx-4 flex-1">
              <Heading
                size={"3"}
                as="h2"
                className="-2xl:text-sm truncate mb-1"
              >
                {name}
              </Heading>
              {tagline && (
                <Text
                  size={"2"}
                  as="p"
                  className="text-gray-11 -2xl:text-xs truncate"
                >
                  {tagline}
                </Text>
              )}
            </div>

            <div className="h-full flex items-center">
              {slug === activeProjectId && user?.username == username && (
                <ProjectMenu project={project} />
              )}
              {loading && slug !== activeProjectId && <Spinner />}
            </div>
          </div>
        </Accordion.Trigger>

        <Accordion.Content asChild>
          <div className="bg-gray-0 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
            <ScrollArea type="auto" className="max-h-[60vh]">
              {renderSections()}
            </ScrollArea>
          </div>
        </Accordion.Content>
      </div>
    </Accordion.Item>
  );
};

export default AccordionProjectItem;
