import { colorOptions, appearanceOptions } from '@/utils';
import NextAuth from 'next-auth';

interface Preferences {
  accentColor: colorOptions;
  theme: appearanceOptions;
}

declare module 'next-auth' {
  interface User {
    uuid?: string;
    username?: string;
    // preferences?: Preferences;
  }

  interface Session {
    user: {
      uuid?: string;
      username?: string;
    } & DefaultSession['user'];
  }
}
