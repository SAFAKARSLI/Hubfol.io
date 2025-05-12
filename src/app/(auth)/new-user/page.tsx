import React, { useEffect } from "react";

import { Box, Heading, Text, Separator, Link } from "@radix-ui/themes";

import Image from "next/image";
import { baseUrl, preferredColorOptions } from "@/utils";

import NewEmployeeForm from "./NewEmployeeForm";

type Props = {};

async function page({}: Props) {
  return (
    <div className="bg-gray-2  max-w-[1200px] border-x border-gray-4  m-auto -lg:w-full min-h-full p-16">
      <Link href={`${baseUrl}/`}>
        <Image
          alt="hubfolio-banner"
          src={"/hubfolio-banner.png"}
          width={500}
          height={250}
          className="m-auto w-[8rem]"
        />
      </Link>
      <div className="w-full m-auto flex flex-col ">
        <Box width={"100%"} className="flex flex-col items-center gap-1 pt-3">
          <Heading size={"6"}>Complete Sign Up</Heading>
          <Separator
            orientation={"horizontal"}
            size={"4"}
            color={preferredColorOptions.accentColor}
          />
          <div className="flex flex-col items-center pt-2">
            <Text size={"3"}>Welcome to the community!</Text>

            <Text size={"3"}>Please complete the form below to sign up.</Text>
          </div>
        </Box>
        <NewEmployeeForm />
      </div>
    </div>
  );
}

export default page;
