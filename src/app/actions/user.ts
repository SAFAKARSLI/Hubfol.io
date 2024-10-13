'use server';

import { prisma } from '@/db';
import { Employee, User } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import { cookies } from 'next/headers';
import { permanentRedirect, redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { baseUrl } from '@/utils';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const logIn = async (userUUID: string) => {
  cookies().set('uid', userUUID);
  await signIn('google', { callbackUrl: `/users/${userUUID}/projects` });
};

export const logOut = async (userUUID: string) => {
  cookies().delete('uid');
  await signOut({ callbackUrl: `/users/${userUUID}/projects` });
};

export const employeeSectionsRedirect = async (
  userUUID: string,
  projectUUID: string
) => {
  redirect(`${baseUrl}/u/${userUUID}/projects/${projectUUID}/sections`);
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

export const createEmployee = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const user = await checkExistingUser(email);

  if (user) {
    const uuid = user.uuid;
    const username = formData.get('username') as string;
    const employee = {
      name: user.name,
      email: user.email,
      userId: user.id,
      uuid,
      username,
      title: formData.get('title') as string,
      phoneNumber: formData.get('phoneNumber') as string,
      hourlyRate: parseFloat(formData.get('hourlyRate') as string),
      createdAt: new Date(),
    } as Employee;

    try {
      await prisma.employee.create({
        data: employee,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          console.error('Error creating employee:', error);
          redirect('/signup?error=account-already-exists-or-username-taken');
        }
      }

      console.error('Error creating employee:', error);
    } finally {
      prisma.$disconnect();
    }
    // console.log('redirect from createEmployee');
    // redirect(`/u/${uuid}/projects`);
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
