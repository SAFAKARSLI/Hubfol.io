import React from "react";
import { Box, Heading, Text, Flex, Avatar, Card } from "@radix-ui/themes";

const team = [
  {
    name: "Safa Karsli",
    role: "Founder & Developer",
    img: "/icons8-customer-100.png", // Replace with actual avatar or use a placeholder
  },
  // Add more team members as needed
];

export default function AboutPage() {
  return (
    <Box className="max-w-3xl mx-auto py-16 px-4">
      <Heading size="8" className="mb-4 text-center font-bold text-violet-11">
        About Hubfolio
      </Heading>
      <Text size="5" className="block text-center mb-10 text-gray-11">
        Hubfolio is on a mission to empower developers and creators to showcase
        their work, connect with employers, and build their digital presence
        with ease. Our platform is designed to make your portfolio stand out and
        help you get discovered.
      </Text>
      <Card className="mb-12 bg-gradient-to-br from-blue-900/60 to-indigo-800/60 p-8 rounded-2xl shadow-xl border-0">
        <Heading size="6" className="mb-2 text-white">
          Our Mission
        </Heading>
        <Text size="4" className="text-white/90">
          We believe every developer deserves a beautiful, powerful portfolio.
          Hubfolio provides the tools to create, customize, and share your
          projects with the world—no limits, no hassle.
        </Text>
      </Card>
      <Heading size="6" className="mb-6 text-center">
        Meet the Team
      </Heading>
      <Flex gap="5" justify="center" wrap="wrap">
        {team.map((member) => (
          <Card
            key={member.name}
            className="p-6 flex flex-col items-center bg-white/5 border-0 shadow-md rounded-xl min-w-[200px]"
          >
            <Avatar
              src={member.img}
              fallback={member.name[0]}
              size="6"
              className="mb-3"
            />
            <Text size="4" className="font-semibold mb-1 text-white">
              {member.name}
            </Text>
            <Text size="3" className="text-gray-11">
              {member.role}
            </Text>
          </Card>
        ))}
      </Flex>
    </Box>
  );
}
