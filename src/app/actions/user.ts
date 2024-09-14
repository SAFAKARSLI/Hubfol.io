'use server';

import { prisma } from '@/db';
import { signIn, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

export const logIn = async (userUUID: string) => {
  await signIn('google', { callbackUrl: `/users/${userUUID}/projects` });
};

export const logOut = async (userUUID: string) => {
  await signOut({ callbackUrl: `/users/${userUUID}/projects` });
};

export const checkExistingUser = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      console.log('User not found');
      return null;
    }
    return user;
  } catch (error) {
    console.error('Error checking existing user:', error);
  } finally {
    prisma.$disconnect();
  }
};

export const updateUser = async (email: string, data: any) => {
  try {
    await prisma.user.update({
      where: { email },
      data,
    });
    redirect('/projects');
  } catch (error) {
    console.error('Error updating user:', error);
  } finally {
    prisma.$disconnect();
  }
};

export const getUser = async (userUUID: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { uuid: userUUID },
    });
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
  } finally {
    prisma.$disconnect();
  }
};
