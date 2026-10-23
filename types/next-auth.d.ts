import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Profile {
    picture?: string;
  }

  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
