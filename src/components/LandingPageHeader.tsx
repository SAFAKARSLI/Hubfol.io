"use client";

import React from "react";
import { Box, Flex, Link, Button } from "@radix-ui/themes";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import AuthenticationButtonsWrapper from "@/components/AuthenticationButtonsWrapper";
import Image from "next/image";
import { usePathname } from "next/navigation";
import HubfolioBanner from "./HubfolioBanner";

export default function LandingPageHeader() {
  const user = useUser();

  const pathname = usePathname();
  const isAboutPage = pathname === "/about";
  const isContactPage = pathname === "/contact";

  return (
    <div className="w-full px-6 py-4 bg-transparent bg-black">
      <Flex align="center" justify="between" className="max-w-6xl mx-auto">
        {/* Logo/Banner */}

        <HubfolioBanner width={160} />

        {/* Navigation */}
        <Flex align="center" gap="6">
          <Link
            href="/about"
            className={`header-link hover:no-underline  hover:text-violet-11 transition-colors text-lg font-medium ${
              isAboutPage ? "text-violet-11" : "text-gray-11"
            }`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`header-link hover:no-underline text-gray-11 hover:text-violet-11 transition-colors text-lg font-medium ${
              isContactPage ? "text-violet-11" : ""
            }`}
          >
            Contact
          </Link>
        </Flex>
        {/* Auth Buttons */}
        <Flex align="center" gap="3">
          <SignedOut>
            <AuthenticationButtonsWrapper />
          </SignedOut>
          <SignedIn>
            <Link href={`/u/${user.user?.username}`}>
              <Button variant="outline">My Account</Button>
            </Link>
          </SignedIn>
        </Flex>
      </Flex>
    </div>
  );
}
