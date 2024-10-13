import NextAuth, { getServerSession, NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

import { Adapter } from 'next-auth/adapters';
import { v4 as uuidv4 } from 'uuid';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/db';
import { redirect } from 'next/navigation';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'database',
  },
  pages: {
    signIn: '/login',
    // signOut: '/auth/signout',
    // error: '/login?error=true',
    // verifyRequest: '/auth/verify-request',
    newUser: '/new-user',
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
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
  events: {
    async createUser(message) {
      redirect(`/new-user`);
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
