"use client";

import React, { useRef, useState } from "react";
import {
  Box,
  Heading,
  Text,
  TextField,
  TextArea,
  Button,
  Flex,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Optionally, you can get the form data here
    // const formData = new FormData(event.target as HTMLFormElement);
    if (formRef.current) {
      formRef.current.reset();
    }
    toast.success("Message sent successfully");
  };

  return (
    <Box className="max-w-xl mx-auto py-16 px-4">
      <Heading size="8" className="mb-4 text-center font-bold text-violet-11">
        Contact Us
      </Heading>
      <Text size="5" className="block text-center mb-10 text-gray-11">
        Have a question, feedback, or want to get in touch? Fill out the form
        below and we'll get back to you as soon as possible.
      </Text>
      <form
        ref={formRef}
        className="space-y-6 bg-violet-2 p-8 rounded-2xl shadow-xl border-0"
        onSubmit={handleSubmit}
      >
        <TextField.Root
          className="w-full"
          placeholder="Your Name"
          name="name"
          required
        />
        <TextField.Root
          className="w-full"
          placeholder="Your Email"
          type="email"
          name="email"
          required
        />
        <TextArea
          className="w-full min-h-[120px]"
          placeholder="Your Message"
          name="message"
          required
        />
        <Flex justify="end">
          <Button color="violet" type="submit" radius="full">
            Send Message
          </Button>
        </Flex>
      </form>
    </Box>
  );
}

// Add a simple fade-in animation for the toast
// In your globals.css, you can add:
// .animate-fade-in { animation: fadeIn 0.3s; }
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
