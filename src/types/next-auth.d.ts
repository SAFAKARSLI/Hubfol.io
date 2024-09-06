import { colorOptions, appearanceOptions } from '@/utils';
import NextAuth from 'next-auth';

interface Preferences {
  accentColor: colorOptions;
  theme: appearanceOptions;
}

declare module 'next-auth' {
  interface User {
    uuid?: string;
    title?: string;
    location?: string;
    phoneNumber?: string;
    hourlyRate?: string;
    preferences?: Preferences;
  }

  interface Session {
    user: {
      uuid?: string;
    } & DefaultSession['user'];
  }
}
