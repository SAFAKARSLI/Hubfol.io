import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Avatar, Heading, Text } from '@radix-ui/themes';
import { Session } from 'next-auth';
import React from 'react';

type Props = {
  session: Session | null;
};

function SidebarProfileOverview({ session }: Props) {
  return (
    <div
      // onClick={() => setVisible(false)}
      className="flex h-10"
    >
      <Avatar
        className="mr-3"
        height={32}
        width={32}
        fallback={session?.user.name[0]}
        src={session?.user.image}
      />
      <div className="flex flex-col justify-between">
        <Heading size={'3'}>{session?.user.name}</Heading>
        <Text color="gray" size={'2'}>
          {session?.user.username ?? 'safakarsli'}
        </Text>
      </div>
    </div>
  );
}

export default SidebarProfileOverview;
