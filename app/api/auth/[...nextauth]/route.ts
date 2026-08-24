import { authOptions } from "@/utils/authOptions";
import NextAuth, { type NextAuthOptions } from "next-auth";

const handler: (req: unknown, res: unknown) => Promise<unknown> = NextAuth(
  authOptions as NextAuthOptions,
);

export { handler as GET, handler as POST };
