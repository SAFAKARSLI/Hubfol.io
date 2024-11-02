'use client';

import Project from '@/types/project';
import ProjectConsole from './ProjectConsole';
import {
  Box,
  DropdownMenu,
  IconButton,
  Separator,
  Spinner,
  Text,
} from '@radix-ui/themes';
import * as Select from '@radix-ui/react-select';

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CodeIcon,
  DesktopIcon,
  DimensionsIcon,
  DotsHorizontalIcon,
  ExternalLinkIcon,
  LaptopIcon,
  Link1Icon,
  MobileIcon,
  ReloadIcon,
  SizeIcon,
  StarFilledIcon,
} from '@radix-ui/react-icons';
import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { set } from 'lodash';
import { useRouter } from 'next/navigation';
import { TbDeviceIpad } from 'react-icons/tb';
import { FaTabletAlt } from 'react-icons/fa';
import { baseUrl } from '@/utils';

type Props = {
  project?: Project;
};

type SelectItemProps = {
  children: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<typeof Select.Item>;

type History = {
  back: string[];
  current: string;
  forward: string[];
};

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={classnames(
          'relative flex h-[2.5rem] truncate select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none text-gray-11 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet-9 data-[disabled]:text-mauve-8 data-[highlighted]:text-violet1 data-[highlighted]:outline-none',
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

function ProjectFrame({ project }: Props) {
  const [file, setFile] = useState<File>();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeDimensions, setIframeDimensions] = useState({
    width: '100%',
    height: '100%',
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
  const [showFrame, setShowFrame] = useState(false);

  useEffect(() => {
    if (project?.type == 'FILE') {
      const fetchProjectFile = async () => {
        const response = await fetch(
          baseUrl + '/api/static-file-provider?key=' + project.content
        );
        const buffer = await response.arrayBuffer();
        const fileName = response.headers.get('Content-Disposition')
          ? response.headers.get('Content-Disposition')?.split('=')[1]
          : 'pdf' + '.pdf';
        const blob = new Blob([buffer], {
          type: 'application/octet-stream',
        });
        const file = new File([blob], fileName as string, {
          type: 'application/pdf',
        });
        setFile(file);
      };

      fetchProjectFile();
    }
  }, []);

  useEffect(() => {
    const iframe = iframeRef.current;

    if (!iframe) {
      console.log('iframe not found');
      return;
    }

    // Listen for messages from the iframe
    const handleMessage = (event: MessageEvent) => {
      // Ensure the message comes from the correct iframe origin
      if (event.origin !== 'http://localhost:5050') return;

      if (event.data.type === 'navigate') {
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
    window.addEventListener('message', handleMessage);

    // Send a message to the iframe when it loads
    const handleIframeLoad = () => {
      try {
        iframe.contentWindow?.postMessage(
          'initialize',
          'http://localhost:5050'
        );
        // console.log('Initialization successfully handled');
      } catch (error) {
        console.error('Error posting message to iframe:', error);
        setError(true);
      }
    };
    // Add the load event listener to the iframe
    iframe.addEventListener('load', handleIframeLoad);

    // Clean up event listeners when the component unmounts
    return () => {
      iframe.removeEventListener('load', handleIframeLoad);
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: iframeRef.current?.clientWidth!,
        height: iframeRef.current?.clientHeight!,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setDimensions({
      width: iframeRef.current?.clientWidth!,
      height: iframeRef.current?.clientHeight!,
    });
  }, [iframeDimensions]);

  // useEffect(() => {
  //   iframeRef.current?.contentWindow?.postMessage('reload', history.current);
  //   // setShowFrame(true);
  // }, []);

  return project?.type == 'URL' ? (
    <div className="h-full flex flex-col">
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
                      type: 'back',
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
                    'reload',
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
                    { type: 'forward', url: history.forward[0] },
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
              <div className="flex items-center gap-4">
                <Text size={'1'} className="text-gray-9">
                  Viewport Options:
                </Text>
                <IconButton
                  variant="ghost"
                  radius="full"
                  onClick={() => {
                    setIframeDimensions({
                      width: '100%',
                      height: '100%',
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
                      width: '1024px',
                      height: '768px',
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
                      width: '375px',
                      height: '720px',
                    });
                  }}
                >
                  <MobileIcon />
                </IconButton>
              </div>
              <Separator orientation="vertical" size="1" />

              <div className="flex items-center gap-4">
                <Text size={'1'} className="text-gray-9">
                  External Links:
                </Text>
                <IconButton
                  variant="ghost"
                  radius="full"
                  onClick={() => {
                    window.open(history.current, '_blank');
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
          className="min-w-[375px] min-h-[600px] rounded m-auto"
        />
        {!showFrame && (
          <div className="absolute inset-0 bg-gray-0 flex items-center justify-center">
            <Spinner />
          </div>
        )}
      </Box>
      <ProjectConsole project={project!} />
      {error && (
        <p className=" absolute top-0 w-full bg-red-300 h-[3rem]">
          Error: Unable to communicate with the iframe.
        </p>
      )}
    </div>
  ) : (
    file && (
      <div className="p-5 h-full w-full">
        <iframe
          src={URL.createObjectURL(file as File)}
          className="rounded h-full w-full border border-gray-6"
        />
      </div>
    )
  );
}

export default ProjectFrame;
