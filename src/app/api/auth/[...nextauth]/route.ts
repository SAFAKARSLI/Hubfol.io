import NextAuth, { getServerSession, NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

import { Adapter } from 'next-auth/adapters';
import { v4 as uuidv4 } from 'uuid';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/db';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'database',
  },
  pages: {
    signIn: '/login',
    // signOut: '/auth/signout',
    error: '/login?error=true',
    // verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user',
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid profile email', // No "prompt=consent" here
          prompt: 'select_account', // Only ask users to select an account
        },
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: { scope: 'read:user user:email' },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Check if the user already has a UUID
      if (!user.uuid) {
        user.uuid = uuidv4();
        // user.preferences.accentColor = 'violet';
        // user.preferences.theme = 'dark';
      }

      return true;
    },
    async session({ session, user, trigger, newSession }) {
      // Add the UUID to the session object
      session.user.uuid = user.uuid;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
