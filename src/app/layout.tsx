import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/components/TopBar";
import { Theme } from "@radix-ui/themes";

export const metadata: Metadata = {
  title: "Hubfol.io",
  description: "Showcase the portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans&display=swap" rel="stylesheet" />
      </head>
      <body >
        <Theme accentColor="violet" appearance="dark">
          <div className="min-h-screen flex flex-col">
            <TopBar />
            <div className="flex flex-1">
              {children}
            </div>
          </div>
        </Theme>
      </body>
    </html>
  );
}
