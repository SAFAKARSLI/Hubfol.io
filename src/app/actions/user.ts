'use server';

import { prisma } from '@/db';
import { Employee, User } from '@prisma/client';
import { signIn, signOut } from 'next-auth/react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

export const logIn = async (userUUID: string) => {
  cookies().set('uid', userUUID);
  await signIn('google', { callbackUrl: `/users/${userUUID}/projects` });
};

export const logOut = async (userUUID: string) => {
  cookies().delete('uid');
  await signOut({ callbackUrl: `/users/${userUUID}/projects` });
};

export const checkExistingUser = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.error('Error checking existing user:', error);
  } finally {
    prisma.$disconnect();
  }
};

export const createEmployee = async (email: string, data: FormData) => {
  const user: User | null = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    const uuid = user.uuid;

    const employee = {
      name: user.name,
      email: user.email,
      userId: user.id,
      uuid,
      title: data.get('title') as string,
      location: data.get('location') as string,
      phoneNumber: data.get('phoneNumber') as string,
      hourlyRate: parseFloat(data.get('hourlyRate') as string),
      createdAt: new Date(),
    } as Employee;

    try {
      await prisma.employee.create({
        data: employee,
      });
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      prisma.$disconnect();
      redirect('/u/' + uuid);
    }
  } else {
    throw new Error(
      'Invalid email provided or user does not exist. There was an error creating the accont. Please try again.'
    );
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
