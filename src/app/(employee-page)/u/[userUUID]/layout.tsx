import type { Metadata } from 'next';
import Head from 'next/head';
import type { Viewport } from 'next';

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

export const viewport: Viewport = {
  width: 'device-width',
  height: 'device-height',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children, params }: Readonly<SlugProps>) {
  return (
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
          <div className="h-[100dvh] overflow-x-hidden">
            <TopBar params={params} />
            <div className="h-[calc(100dvh-6rem)]">{children}</div>
          </div>
        </body>
      </Theme>
    </html>
  );
}
