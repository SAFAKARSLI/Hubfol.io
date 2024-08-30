import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    uuid?: string;
  }

  interface Session {
    user: {
      uuid?: string;
    } & DefaultSession['user'];
  }
}
