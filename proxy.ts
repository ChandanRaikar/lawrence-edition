import { NextRequest, NextResponse } from "next/server";
import getSessionUser from "@/utils/getSessionUser";

export async function proxy(request: NextRequest) {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/properties/add", "/profile", "/properties/saved", "/messages"],
};
