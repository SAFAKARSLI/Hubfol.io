import { prisma } from '@/db';
import { Brand } from '@/types/brand';
import { NextApiRequest, NextApiResponse } from 'next';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { baseUrl } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const user = auth();
  if (user) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/new-user`,
      303
    );
  } else {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/signup?error=internal-error`,
      303
    );
  }

  return {};
}
