"use client";

import React from "react";
import { Box, Flex, Link, Button } from "@radix-ui/themes";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import AuthenticationButtonsWrapper from "@/components/AuthenticationButtonsWrapper";
import Image from "next/image";
import { usePathname } from "next/navigation";
import HubfolioBanner from "./HubfolioBanner";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function LandingPageHeader() {
  const user = useUser();
  const pathname = usePathname();
  const isAboutPage = pathname === "/about";
  const isContactPage = pathname === "/contact";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full px-6 py-4 bg-transparent bg-black">
      <Flex align="center" justify="between" className="max-w-6xl mx-auto">
        {/* Logo/Banner */}

        <HubfolioBanner width={160} />

        {/* Desktop Navigation */}
        <Flex align="center" gap="6" className="hidden md:flex">
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

        {/* Desktop Auth Buttons */}
        <Flex align="center" gap="3" className="hidden md:flex">
          <SignedOut>
            <AuthenticationButtonsWrapper />
          </SignedOut>
          <SignedIn>
            <Link href={`/u/${user.user?.username}`}>
              <Button variant="outline">My Account</Button>
            </Link>
          </SignedIn>
        </Flex>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Open menu"
        >
          <HamburgerMenuIcon className="w-6 h-6 text-white" />
        </button>
      </Flex>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black rounded-b shadow-lg border-t border-gray-7 px-6 py-4">
          <Flex direction="column" gap="4">
            <Link
              href="/about"
              className={`header-link hover:no-underline hover:text-violet-11 transition-colors text-lg font-medium ${
                isAboutPage ? "text-violet-11" : "text-gray-11"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`header-link hover:no-underline text-gray-11 hover:text-violet-11 transition-colors text-lg font-medium ${
                isContactPage ? "text-violet-11" : ""
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
            <SignedOut>
              <div className="flex justify-center items-center">
                <AuthenticationButtonsWrapper />
              </div>
            </SignedOut>
            <SignedIn>
              <Link href={`/u/${user.user?.username}`}>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setMenuOpen(false)}
                >
                  My Account
                </Button>
              </Link>
            </SignedIn>
          </Flex>
        </div>
      )}
    </div>
  );
}
