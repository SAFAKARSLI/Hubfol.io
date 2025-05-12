import type { Metadata } from "next";
import Head from "next/head";
import type { Viewport } from "next";

import "@/app/globals.css";
import TopBar from "@/components/TopBar";
import { Theme } from "@radix-ui/themes";
import React from "react";
import { SlugProps } from "@/types/slug";
import { preferredColorOptions } from "@/utils";
import {
  ClerkProvider,
  GoogleOneTap,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import LandingPageHeader from "@/components/LandingPageHeader";
import LandingPageFooter from "@/components/LandingPageFooter";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Hubfolio",
  description: "Showcase your portfolio",
  icons: {
    icon: "/hubfolio-dark-logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children, params }: Readonly<SlugProps>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=PT+Sans&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Theme
          accentColor={preferredColorOptions.accentColor}
          appearance={preferredColorOptions.appearance}
          asChild
        >
          <body>
            <LandingPageHeader />
            <Toaster />
            {children}
            <LandingPageFooter />
          </body>
        </Theme>
      </html>
    </ClerkProvider>
  );
}
