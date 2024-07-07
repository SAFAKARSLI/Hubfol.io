import type { Metadata } from "next";
import "./globals.css";

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
        {children}
        </body>
    </html>
  );
}
