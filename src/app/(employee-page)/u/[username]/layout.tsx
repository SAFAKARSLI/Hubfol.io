import type { Metadata } from "next";
import Head from "next/head";
import type { Viewport } from "next";

import "@/app/globals.css";
import TopBar from "@/components/TopBar";
import { Theme } from "@radix-ui/themes";
import React from "react";
import { SlugProps } from "@/types/slug";
import { baseUrl, preferredColorOptions } from "@/utils";
import { ClerkProvider } from "@clerk/nextjs";
import NextTopLoader from "nextjs-toploader";
import ToasterWrapper from "@/components/ToasterWrapper";
import { Toaster } from "react-hot-toast";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
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

export default async function RootLayout({
  children,
  params,
}: Readonly<SlugProps>) {
  const user = await currentUser();

  if (user && !user.username) {
    redirect(`${baseUrl}/new-user`);
  }

  return (
    <ClerkProvider signInUrl={`${baseUrl}/u/${user?.username}`}>
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
            <ToasterWrapper />
            <div className="h-[100dvh] ">
              <TopBar params={params} />
              <NextTopLoader color="#2D3B9B" showSpinner={false} />
              <div>{children}</div>
            </div>
          </body>
        </Theme>
      </html>
    </ClerkProvider>
  );
}
