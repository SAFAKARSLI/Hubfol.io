import { CardStackIcon } from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
import ErrorPopup from "./custom-comps/ErrorPopup";
import { errorCodes } from "@/utils";

type Props = {};

function NoActiveProjectBanner({}: Props) {
  return (
    <>
      <Flex
        direction={"column"}
        gap={"3"}
        className="h-screen items-center justify-center text-center"
      >
        <Image alt="brand-logo" src="/icon.png" width={200} height={200} />
        <Text weight={"bold"} size={"5"}>
          Select a project to view
        </Text>
      </Flex>
    </>
  );
}

export default NoActiveProjectBanner;
