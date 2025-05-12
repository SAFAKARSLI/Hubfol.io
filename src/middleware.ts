import {
  clerkMiddleware,
  createRouteMatcher,
  getAuth,
} from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import rateLimitMiddleware from "./rateLimiter";
import { baseUrl } from "./utils";

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  return rateLimitMiddleware(req, userId!);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
