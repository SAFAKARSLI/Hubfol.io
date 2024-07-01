import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LeftPanel from "./components/LeftPanel";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <LeftPanel/>
        {children}
        </body>
    </html>
  );
}
