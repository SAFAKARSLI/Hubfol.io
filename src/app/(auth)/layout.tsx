'use client';
import '@/app/globals.css';
import { preferredColorOptions } from '@/utils';
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <SessionProvider session={session}>
          <Theme
            accentColor={preferredColorOptions.accentColor}
            appearance={preferredColorOptions.appearance}
            panelBackground="translucent"
          >
            <div>{children}</div>
          </Theme>
        </SessionProvider>
      </body>
    </html>
  );
}
