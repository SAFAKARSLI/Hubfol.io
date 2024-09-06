import type { Metadata } from 'next';
import '@/app/globals.css';
import TopBar from '@/components/TopBar';
import { Theme } from '@radix-ui/themes';
import React from 'react';
import { SlugProps } from '@/types/slug';
import { preferredColorOptions } from '@/utils';

export const metadata: Metadata = {
  title: 'Hubfolio',
  description: 'Showcase your portfolio',
};

export default function RootLayout({ children, params }: Readonly<SlugProps>) {
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
        <Theme
          accentColor={preferredColorOptions.accentColor}
          appearance={preferredColorOptions.appearance}
        >
          <div className="min-h-[100dvh] flex flex-col">
            <TopBar params={params} />
            <div className="flex flex-1">{children}</div>
          </div>
        </Theme>
      </body>
    </html>
  );
}
