import { getUser } from '@/app/actions/user';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const user = auth();
  if (user) {
    const clerkUser = await getUser(user.userId!);
    const hubfolioUsername = clerkUser?.privateMetadata?.hubfolioUsername;
    if (!hubfolioUsername) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/new-user`,
        303
      );
    }

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/u/${hubfolioUsername}/projects`,
      303
    );
  }
  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/signup?error=internal-error`,
    303
  );
}
