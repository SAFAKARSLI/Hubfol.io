import type { Metadata } from "next";
import "./globals.css";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";

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
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <div className="flex flex-1">
          {children}
        </div>
    </div>
        </body>
    </html>
  );
}
