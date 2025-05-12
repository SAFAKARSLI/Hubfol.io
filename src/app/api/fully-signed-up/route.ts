import { prisma } from "@/db";
import { Brand } from "@/types/brand";
import { NextApiRequest, NextApiResponse } from "next";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { baseUrl } from "@/utils";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/app/actions/user";

export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  const user = auth();
  const clerkUser = await getUser(user.userId!);
  const username = clerkUser?.privateMetadata.hubfolioUsername;
  if (!username) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/new-user`,
      303
    );
  }
  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/u/${username}/projects`,
    303
  );
}
