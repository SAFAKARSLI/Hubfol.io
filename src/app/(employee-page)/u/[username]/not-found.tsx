"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Flex, Heading, Link, Separator, Text } from "@radix-ui/themes";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
type Props = {};

export default function NotFoundPage({}: Props) {
  const router = useRouter();

  return (
    <div className="max-w-[900px] m-auto py-8 px-5">
      <div className="text-center flex flex-col gap-3">
        <Heading as="h1" className="text-center -2xl:text-md text-wrap">
          Sorry, we couldn't find what you were looking for.
        </Heading>
        <Text className="text-center text-gray-11 mt-2 ">
          Please use the following link to access the home page:
        </Text>
        <Link href="/">Home Page</Link>
        <Flex justify="center" align="center" gap="2">
          <ArrowLeftIcon />
          <Text
            onClick={() => router.back()}
            className="cursor-pointer hover:underline text-gray-11"
          >
            Go Previous Page
          </Text>
        </Flex>
      </div>
    </div>
  );
}
