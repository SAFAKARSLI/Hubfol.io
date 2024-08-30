import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    uuid?: string;
    title?: string;
    location?: string;
    phoneNumber?: string;
    hourlyRate?: string;
  }

  interface Session {
    user: {
      uuid?: string;
    } & DefaultSession['user'];
  }
}
