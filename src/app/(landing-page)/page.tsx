import React from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import AuthenticationButtonsWrapper from "@/components/AuthenticationButtonsWrapper";
import { Button, Link, Heading, Text, Flex, Card, Box } from "@radix-ui/themes";
import { currentUser } from "@clerk/nextjs/server";
import { RocketIcon, MagicWandIcon, PersonIcon } from "@radix-ui/react-icons";
import LandingPageHeader from "@/components/LandingPageHeader";
import LandingPageFooter from "@/components/LandingPageFooter";

export default async function page() {
  const user = await currentUser();

  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto pt-24 pb-16 px-4 text-center">
        <Heading size="9" className="font-extrabold mb-4 tracking-tight">
          Build Your <span className="text-violet-9">Portfolio</span>.<br />
          Get Discovered.
        </Heading>
        <Text size="6" className="mb-8 block text-gray-11">
          Hubfolio helps developers and creators showcase their projects,
          attract employers, and grow their digital presence—all in one
          beautiful, customizable platform.
        </Text>
        <Link href="/sign-up">
          <Button variant="soft" size="4" color="gray" radius="full">
            Get Started
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="max-w-5xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-violet-2 border-0 shadow-lg p-8 flex flex-col items-center">
          <RocketIcon className="w-16 h-16 mb-4 text-violet-9" />
          <Heading size="5" className="mb-2 text-violet-11">
            Showcase Projects
          </Heading>
          <Text className="text-gray-11 text-center">
            List unlimited projects and let your work speak for itself. Get
            discovered by employers and collaborators.
          </Text>
        </Card>
        <Card className="bg-indigo-2 border-0 shadow-lg p-8 flex flex-col items-center">
          <MagicWandIcon className="w-16 h-16 mb-4 text-indigo-9" />
          <Heading size="5" className="mb-2 text-indigo-11">
            AI Resume Builder
          </Heading>
          <Text className="text-gray-11 text-center">
            Generate a stunning, professional resume with the help of AI. Stand
            out from the crowd with ease.
          </Text>
        </Card>
        <Card className="bg-blue-2 border-0 shadow-lg p-8 flex flex-col items-center">
          <PersonIcon className="w-16 h-16 mb-4 text-blue-9" />
          <Heading size="5" className="mb-2 text-blue-11">
            Get Hired
          </Heading>
          <Text className="text-gray-11 text-center">
            Employers can find and contact you directly. Use Hubfolio as your
            digital resume and portfolio for job applications.
          </Text>
        </Card>
      </section>

      {/* How It Works Section */}
      <section className="max-w-4xl mx-auto py-16 px-4">
        <Heading size="7" className="mb-8 text-center text-violet-11">
          How It Works
        </Heading>
        <Flex direction="column" gap="6" align="center">
          <Box className="flex flex-col md:flex-row gap-8 w-full justify-center">
            <Card className="flex-1 bg-violet-2 border-0 shadow p-6 min-w-[200px]">
              <Heading size="4" className="mb-2 text-violet-11">
                1. Sign Up
              </Heading>
              <Text className="text-gray-11">
                Create your free account in seconds with Google or email.
              </Text>
            </Card>
            <Card className="flex-1 bg-indigo-2 border-0 shadow p-6 min-w-[200px]">
              <Heading size="4" className="mb-2 text-indigo-11">
                2. Add Projects
              </Heading>
              <Text className="text-gray-11">
                Showcase your best work, add images, and write about your
                experience.
              </Text>
            </Card>
            <Card className="flex-1 bg-blue-2 border-0 shadow p-6 min-w-[200px]">
              <Heading size="4" className="mb-2 text-blue-11">
                3. Share & Get Discovered
              </Heading>
              <Text className="text-gray-11">
                Share your profile link and let employers or collaborators find
                you.
              </Text>
            </Card>
          </Box>
        </Flex>
      </section>
    </div>
  );
}
