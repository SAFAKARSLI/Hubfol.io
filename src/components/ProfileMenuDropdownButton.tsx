import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PersonIcon } from '@radix-ui/react-icons';
import { Avatar } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import React from 'react';

type Props = {};

async function ProfileMenuDropdownButton({}: Props) {
  const session = await getServerSession(authOptions);
  const comp = session?.user ? (
    <Avatar size={'2'} fallback={`profile-photo`} src={session.user.image} />
  ) : (
    <PersonIcon className="w-6 h-6" />
  );
  return <>{comp}</>;
}

export default ProfileMenuDropdownButton;
