import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/app/actions/user";
import { baseUrl } from "@/utils";

export async function GET(req: NextRequest) {
  const user = auth();
  const clerkUser = await getUser(user.userId!);
  const username = clerkUser?.privateMetadata.hubfolioUsername;
  if (!username) {
    return NextResponse.redirect(`${baseUrl}/new-user`, 303);
  }
  return NextResponse.redirect(`${baseUrl}/u/${username}/projects`, 303);
}
