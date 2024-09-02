import type { Metadata } from 'next';
import '@/app/globals.css';
import TopBar from '@/components/TopBar';
import { Theme } from '@radix-ui/themes';
import React from 'react';
import { Params, SlugProps } from '@/types/slug';
import { preferredColorOptions } from '@/utils';

export const metadata: Metadata = {
  title: 'Hubfol.io',
  description: 'Showcase the portfolio',
};

export default function RootLayout({ children, params }: Readonly<SlugProps>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Theme
          accentColor={preferredColorOptions.accentColor}
          appearance={preferredColorOptions.appearance}
          grayColor={preferredColorOptions.grayColor}
        >
          <div className="min-h-screen flex flex-col">
            <TopBar params={params} children={children} />
            <div className="flex flex-1">{children}</div>
          </div>
        </Theme>
      </body>
    </html>
  );
}
