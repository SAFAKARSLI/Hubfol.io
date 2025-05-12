import React from "react";
import { Box, Heading, Text } from "@radix-ui/themes";

export default function PrivacyPage() {
  return (
    <Box className="max-w-2xl mx-auto py-16 px-4">
      <Heading size="8" className="mb-4 text-center font-bold text-violet-11">
        Privacy Policy
      </Heading>
      <Text size="5" className="block text-center mb-10 text-gray-11">
        Your privacy is important to us. This page explains how Hubfolio
        collects, uses, and protects your information.
      </Text>
      <section className="mb-8">
        <Heading size="5" className="mb-2 text-violet-11">
          1. Data Collection
        </Heading>
        <Text className="text-gray-11">
          We collect information you provide when you sign up, create a profile,
          or interact with our platform. This may include your name, email,
          profile details, and project information.
        </Text>
      </section>
      <section className="mb-8">
        <Heading size="5" className="mb-2 text-violet-11">
          2. Use of Information
        </Heading>
        <Text className="text-gray-11">
          We use your information to provide and improve our services,
          personalize your experience, and communicate important updates. We do
          not sell your data to third parties.
        </Text>
      </section>
      <section className="mb-8">
        <Heading size="5" className="mb-2 text-violet-11">
          3. Your Rights
        </Heading>
        <Text className="text-gray-11">
          You have the right to access, update, or delete your personal
          information at any time. Contact us if you have any questions or
          requests regarding your data.
        </Text>
      </section>
      <Text className="text-gray-10 mt-8 block text-center">
        For more details, please contact us at{" "}
        <a
          href="mailto:support@hubfolio.io"
          className="text-violet-11 underline"
        >
          support@hubfolio.io
        </a>
        .
      </Text>
    </Box>
  );
}
