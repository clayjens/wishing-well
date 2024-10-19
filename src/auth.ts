import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

import db from "@/db";

export const authConfig = {
  adapter: DrizzleAdapter(db),
  providers: [GitHub],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const paths = [""];
      const isProtected = paths.some((path) =>
        nextUrl.pathname.startsWith(path)
      );

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL("api/auth/signin", nextUrl.origin);
        redirectUrl.searchParams.set("callbackUrl", nextUrl.href);
        return Response.redirect(redirectUrl);
      }

      return true;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signOut } = NextAuth(authConfig);
