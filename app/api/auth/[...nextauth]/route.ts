import { authOptions } from "@/utils/authOptions";
import NextAuth from "next-auth";
import type { NextRequest } from "next/server";

const authHandler = NextAuth(authOptions);

async function handler(
  request: NextRequest,
  context: RouteContext<"/api/auth/[...nextauth]">,
): Promise<Response> {
  return authHandler(request, context);
}

export { handler as GET, handler as POST };
