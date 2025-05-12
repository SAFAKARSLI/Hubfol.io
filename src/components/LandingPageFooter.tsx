import React from "react";
import { Flex, Link, Text } from "@radix-ui/themes";
import Image from "next/image";

export default function LandingPageFooter() {
  return (
    <footer className="w-full bg-violet-2 border-t border-violet-4 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo and Brand */}
        <Flex align="center" gap="3">
          <span className="text-lg font-bold text-violet-11 tracking-tight">
            Hubfolio
          </span>
        </Flex>
        {/* Navigation Links */}
        <Flex align="center" gap="6">
          <Link
            href="/about"
            className="text-gray-11 hover:text-violet-11 transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-gray-11 hover:text-violet-11 transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/privacy"
            className="text-gray-11 hover:text-violet-11 transition-colors"
          >
            Privacy
          </Link>
        </Flex>
        {/* Copyright */}
        <Text size="2" className="text-gray-9 text-center md:text-right">
          © {new Date().getFullYear()} Hubfolio. All rights reserved.
        </Text>
      </div>
    </footer>
  );
}
