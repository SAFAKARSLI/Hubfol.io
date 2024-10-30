import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getUser } from './app/actions/user';

const rateLimitMap = new Map();

export default function rateLimitMiddleware(req: NextRequest, userId: string) {
  const limit = 60; // Limiting requests to 20 per minute per userId
  const windowMs = 60 * 1000; // 1 minute

  if (!rateLimitMap.has(userId)) {
    rateLimitMap.set(userId, {
      count: 0,
      lastReset: Date.now(),
    });
  }

  const ipData = rateLimitMap.get(userId);

  if (Date.now() - ipData.lastReset > windowMs) {
    ipData.count = 0;
    ipData.lastReset = Date.now();
  }

  if (ipData.count >= limit) {
    return NextResponse.error();
  }

  ipData.count += 1;
  NextResponse.next();
}
