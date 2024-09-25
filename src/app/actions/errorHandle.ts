'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const handleError = () => {
  const userUUID = cookies().get('uid');
  if (userUUID) {
    redirect(`/u/${userUUID}/projects`);
  }
  redirect('/');
};
