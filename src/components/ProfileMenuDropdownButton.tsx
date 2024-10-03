import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PersonIcon } from '@radix-ui/react-icons';
import { Avatar } from '@radix-ui/themes';
import { getServerSession, Session } from 'next-auth';
import React from 'react';

type Props = {
  session: Session | null;
};

async function ProfileMenuDropdownButton({ session }: Props) {
  const comp = session?.user ? (
    <Avatar
      size={'2'}
      fallback={session?.user.name[0]}
      src={session?.user.image}
    />
  ) : (
    <PersonIcon className="w-6 h-6" />
  );
  return <>{comp}</>;
}

export default ProfileMenuDropdownButton;
