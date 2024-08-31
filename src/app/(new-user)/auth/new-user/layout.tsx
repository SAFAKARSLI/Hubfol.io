'use client';
import '@/app/globals.css';
import { Theme } from '@radix-ui/themes';

import { SessionProvider } from 'next-auth/react';

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: any;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SessionProvider session={session}>
          <Theme accentColor="violet" appearance="dark">
            <div className="h-screen w-screen bg-gray-2 flex justify-center items-center">
              {children}
            </div>
          </Theme>
        </SessionProvider>
      </body>
    </html>
  );
}
