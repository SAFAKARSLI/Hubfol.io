import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { baseUrl } from "@/utils";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  const user = await currentUser();

  if (!user) {
    redirect(baseUrl + "/sign-in");
  }
  return NextResponse.redirect(baseUrl + "/u/" + user.username + "/account");
}
