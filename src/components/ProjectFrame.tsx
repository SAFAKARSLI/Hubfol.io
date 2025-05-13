"use client";

import Project from "@/types/project";
import ProjectConsole from "./ProjectConsole";
import { Box, IconButton, Separator, Text } from "@radix-ui/themes";
import * as Select from "@radix-ui/react-select";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  DesktopIcon,
  DimensionsIcon,
  ExternalLinkIcon,
  Link1Icon,
  MobileIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import React, { useEffect, useRef, useState } from "react";
import classnames from "classnames";
import { useRouter } from "next/navigation";
import { FaTabletAlt } from "react-icons/fa";
import { baseUrl } from "@/utils";
import Section from "@/types/section";

type History = {
  back: string[];
  current: string;
  forward: string[];
};

type Props = {
  project?: Project;
  sections: Section[];
};

function ProjectFrame({ project, sections }: Props) {
  const [file, setFile] = useState<File>();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeDimensions, setIframeDimensions] = useState({
    width: "100%",
    height: "100%",
  });
  const [history, setHistory] = useState<History>({
    back: [],
    current: project?.content!,
    forward: [],
  });

  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [error, setError] = useState<boolean>(false); // Error state for iframe
  const router = useRouter();

  useEffect(() => {
    if (project?.type == "FILE") {
      const fetchProjectFile = async () => {
        const response = await fetch(
          baseUrl +
            "/api/static-file-provider?bucketName=hubfol.io.file-projects&key=" +
            project.content
        );
        const buffer = await response.arrayBuffer();
        const fileName = response.headers
          .get("Content-Disposition")
          ?.split("=")[1];

        const file = new File([buffer], fileName as string, {
          type: "application/pdf",
        });
        setFile(file);
      };

      fetchProjectFile();
    }
  }, []);

  useEffect(() => {
    const iframe = iframeRef.current;

    if (!iframe) {
      return;
    }

    // Listen for messages from the iframe
    const handleMessage = (event: MessageEvent) => {
      // Ensure the message comes from the correct iframe origin
      if (event.origin !== "http://localhost:5050") return;

      if (event.data.type == "current-url") {
        setHistory((prev) => ({
          ...prev,
          current: event.data.url,
        }));
      }

      if (event.data.type == "navigate") {
        if (history.forward[history.forward.length - 1] !== event.data.url) {
          setHistory((prev) => ({
            back: [...prev.back, prev.current],
            current: event.data.url,
            forward: prev.forward.slice(1),
          }));
        }
      }
    };
    // Listen for postMessage events
    window.addEventListener("message", handleMessage);

    // Send a message to the iframe when it loads
    const handleIframeLoad = () => {
      try {
        iframe.contentWindow?.postMessage(
          "initialize",
          "http://localhost:5050"
        );
        console.log("Initialization successfully handled");
      } catch (error) {
        console.error("Error posting message to iframe:", error);
        setError(true);
      }
    };
    // Add the load event listener to the iframe
    iframe.addEventListener("load", handleIframeLoad);

    // Clean up event listeners when the component unmounts
    return () => {
      iframe.removeEventListener("load", handleIframeLoad);
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: iframeRef.current?.clientWidth!,
        height: iframeRef.current?.clientHeight!,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setDimensions({
      width: iframeRef.current?.clientWidth!,
      height: iframeRef.current?.clientHeight!,
    });
  }, [iframeDimensions]);

  return project?.type == "URL" ? (
    <div className="h-full flex flex-col" id="project-frame">
      <div className="h-[6rem] mx-5 ship flex-none justify-center flex flex-col justify-between py-3">
        <div className=" bg-gray-2 h-[2.5rem] rounded-full flex items-center border border-gray-4 ">
          {/* <Text className="text-gray-10 flex  items-center ml-5">
            <StarFilledIcon />:
          </Text>
          <Select.Root defaultValue="banana">
            <Select.Trigger
              className="m-1  inline-flex h-[2.2rem] max-w-[15rem] items-center justify-between gap-[5px] rounded-full bg-gray-0 hover:bg-gray-1 px-[15px] text-xs leading-none text-violet-11  outline-none"
              aria-label="pages"
            >
              <div className="w-9/10 truncate">
                <Select.Value />
              </div>
              <Select.Icon className="text-violet-11">
                <ChevronDownIcon />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content
                position="popper"
                side="right"
                className="overflow-hidden w-[15rem] rounded border border-gray-4 m-1 bg-gray-0 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
              >
                <Select.Viewport className="p-[5px]">
                  <Select.Group>
                    <Select.Label className="px-[25px] text-xs font-medium leading-[25px] text-gray-9">
                      Highlighted Routes
                    </Select.Label>
                    <SelectItem value="banana">
                      Bananakasdfhldsakjfkasd;l;ksd;laflasdfsadlfllkdjlksjalfl
                    </SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </Select.Group>
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root> */}
          <div className="flex w-full justify-between  items-center px-5">
            <div className="flex items-center gap-4">
              <IconButton
                variant="ghost"
                radius="full"
                disabled={history.back.length === 0}
                onClick={() => {
                  iframeRef.current?.contentWindow?.postMessage(
                    {
                      type: "back",
                      url: history.back[history.back.length - 1],
                    },
                    history.current
                  );
                  setHistory((prev) => ({
                    back: prev.back.slice(0, -1),
                    current: prev.back[prev.back.length - 1],
                    forward: [prev.current, ...prev.forward],
                  }));
                }}
              >
                <ArrowLeftIcon />
              </IconButton>
              <IconButton
                variant="ghost"
                radius="full"
                onClick={() => {
                  router.refresh();
                  iframeRef.current?.contentWindow?.postMessage(
                    "reload",
                    history.current
                  );
                }}
              >
                <ReloadIcon />
              </IconButton>
              <IconButton
                variant="ghost"
                radius="full"
                disabled={history.forward.length === 0}
                onClick={() => {
                  iframeRef.current?.contentWindow?.postMessage(
                    { type: "forward", url: history.forward[0] },
                    history.current
                  );
                  setHistory((prev) => ({
                    back: [...prev.back, prev.current],
                    current: prev.forward[0],
                    forward: prev.forward.slice(1),
                  }));
                }}
              >
                <ArrowRightIcon />
              </IconButton>
            </div>
            <div className="flex gap-10">
              <div className="flex items-center gap-4 hidden lg:flex">
                <Text size={"1"} className="text-gray-9">
                  Viewport Options:
                </Text>
                <IconButton
                  variant="ghost"
                  radius="full"
                  onClick={() => {
                    setIframeDimensions({
                      width: "100%",
                      height: "100%",
                    });
                  }}
                >
                  <DesktopIcon />
                </IconButton>
                <IconButton
                  variant="ghost"
                  radius="full"
                  onClick={() => {
                    setIframeDimensions({
                      width: "1024px",
                      height: "768px",
                    });
                  }}
                >
                  <FaTabletAlt />
                </IconButton>
                <IconButton
                  variant="ghost"
                  radius="full"
                  onClick={() => {
                    setIframeDimensions({
                      width: "375px",
                      height: "720px",
                    });
                  }}
                >
                  <MobileIcon />
                </IconButton>
              </div>
              <Separator orientation="vertical" size="1" />

              <div className="flex items-center gap-4">
                <Text size={"1"} className="text-gray-9">
                  External Links:
                </Text>
                <IconButton
                  variant="ghost"
                  radius="full"
                  onClick={() => {
                    window.open(history.current, "_blank");
                  }}
                >
                  <ExternalLinkIcon />
                </IconButton>
                {/* <IconButton variant="ghost" radius="full">
                  <CodeIcon />
                </IconButton> */}
              </div>
            </div>
          </div>
        </div>
        <div className="text-gray-10 mx-5 text-xs">
          <Text>
            <Link1Icon className="h-4 w-4 inline-block mr-2" />
            {history.current}
          </Text>
          <Text className="float-right">
            <DimensionsIcon className="h-4 w-4 inline-block mr-2" />
            {dimensions.width} x {dimensions.height}
          </Text>
        </div>
      </div>
      <Box className="flex-grow mx-5 mb-5 relative">
        <iframe
          ref={iframeRef}
          width={iframeDimensions.width}
          height={iframeDimensions.height}
          src={history.current}
          key={project!.uuid}
          className=" min-h-[600px] rounded m-auto border border-gray-3"
        />
      </Box>
      <ProjectConsole project={project!} sections={sections} />
      {error && (
        <p className=" absolute top-0 w-full bg-red-300 h-[3rem]">
          Error: Unable to communicate with the iframe.
        </p>
      )}
    </div>
  ) : (
    file && (
      <div className="p-5 h-screen w-full">
        <iframe
          src={URL.createObjectURL(file as File)}
          className="rounded flex-grow h-full w-full border border-gray-6"
        />
      </div>
    )
  );
}

ProjectFrame.displayName = "ProjectFrame";
export default ProjectFrame;
