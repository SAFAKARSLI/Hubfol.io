import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { baseUrl } from './utils';
import { getServerSession } from 'next-auth';
import { authOptions } from './app/api/auth/[...nextauth]/route';

export async function middleware(request: NextRequest) {}

export const config = {
  matcher: ['/u/:path*/projects/:path*/:path*'],
};
