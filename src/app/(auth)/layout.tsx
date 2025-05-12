import "@/app/globals.css";
import { preferredColorOptions } from "@/utils";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import { Spinner, Theme } from "@radix-ui/themes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hubfolio",
  description: "Showcase your portfolio",
  icons: {
    icon: "/hubfolio-dark-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            href="https://fonts.googleapis.com/css2?family=PT+Sans&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="/css/react-phone-number-input/style.css"
          />

          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </head>
        <Theme
          accentColor={preferredColorOptions.accentColor}
          appearance={"dark"}
          panelBackground="translucent"
          asChild
        >
          <body>
            <ClerkLoading>
              <div className="w-screen h-screen flex items-center justify-center">
                <Spinner />
              </div>
            </ClerkLoading>
            <ClerkLoaded>
              <div>{children}</div>
            </ClerkLoaded>
          </body>
        </Theme>
      </html>
    </ClerkProvider>
  );
}
