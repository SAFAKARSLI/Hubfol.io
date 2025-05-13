import {
  Box,
  Button,
  Card,
  Heading,
  Link,
  Spinner,
  Text,
} from "@radix-ui/themes";
import Image from "next/image";
import React, { Suspense } from "react";
import ListItem from "../ListItem";
import { FaGithub, FaGoogle } from "react-icons/fa";
import OAuthSignInButton from "@/components/OAuthSignInButton";
import * as Form from "@radix-ui/react-form";
import OAuthSignUpButton from "@/components/OAuthSignUpButton";
import FormInput from "@/components/project-form/FormInput";
import NewEmployeeForm from "../../new-user/NewEmployeeForm";
import SubmitButton from "@/components/SubmitButton";
import { SignUp } from "@clerk/nextjs";
import { baseUrl, customThemeClerkAuthenticationComponents } from "@/utils";
import HubfolioBanner from "@/components/HubfolioBanner";

type Props = {};

function page({}: Props) {
  return (
    <div className="flex w-full min-h-screen lg:flex-row flex-col-reverse">
      <div className="lg:w-1/2 -lg:min-h-[75vh] lg:border-r -lg:border-b border-violet-8 bg-gray-2 lg:rounded-r -lg:rounded-b shadow-[0_0_30px_8px_rgba(44,20,219,1)] flex flex-col items-center">
        <Box pt={"4"}>
          <HubfolioBanner width={160} />
        </Box>
        <div className="grow w-3/5 -md:w-4/5 max-w-[700px]  flex flex-col  items-center my-10">
          <div className="text-center my-6">
            <Heading className="mb-3 " size={"8"}>
              Welcome to{" "}
              <Text className="font-serif text-violet-9">Hubfolio</Text>
            </Heading>
            <Text className="text-center text-sm text-gray-10">
              Hubfolio is a social media platform that allows developers to flex
              with their projects and reach out to potential clients.
            </Text>
          </div>
          <div className="flex flex-col gap-[4rem] items-center grow justify-center border rounded border-gray-5 bg-gray-1 p-6 max-h-[900px] shadow-lg">
            <ListItem
              title="Showcase Your Projects"
              text={
                "List your projects on your profile and get discovered by other developers and employers. There is no project limit! You can list as many projects as you want."
              }
            />
            <ListItem
              title="Custom Template Builder"
              aiBanner
              text={`With our AI Asisted tool, you can easily create a custom template for your projects, tailored to the needs of your client. Each template is unique for each client and can be easily modified.`}
            />
            <ListItem
              title="Attract More Employers"
              text={
                "Employers can discover your projects and hire you directly from your profile. You can use your Hubfolio account as your digital resume to apply for jobs."
              }
            />
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 -lg:h-screen max-h-[80rem] min-h-[50rem] flex items-center justify-center">
        <Suspense fallback={<Spinner />}>
          <SignUp
            signInUrl={`${baseUrl}/sign-in`}
            appearance={customThemeClerkAuthenticationComponents}
            forceRedirectUrl={"/api/fully-signed-up"}
          />
        </Suspense>
      </div>
    </div>
  );
}

export default page;
