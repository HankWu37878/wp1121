import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

import CredentialsProvider from "./CredentialsProvider";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  }), CredentialsProvider],
  callbacks: {
    async session({ session, token }) {
      const email = token.email || session?.user?.email;
      if (!email) return session;

      const [user] = await db
        .select({
          id: usersTable.displayId,
          provider: usersTable.provider,
        })
        .from(usersTable)
        .where(eq(usersTable.email, email.toLowerCase()))
        .execute();

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          provider: user.provider,
        },
      };
    },
    async jwt({ token, account }) {
      if (!account) return token;
      const { name, email } = token;
      const provider = account.provider;
      if (!name || !email || !provider) return token;


      const [existedUser] = await db
        .select({
          id: usersTable.displayId,
        })
        .from(usersTable)
        .where(eq(usersTable.email, email.toLowerCase()))
        .execute();
      if (existedUser) return token;
      if (provider !== "google") return token;

      await db.insert(usersTable).values({
        name: name,
        email: email.toLowerCase(),
        provider,
      });

      return token;
    },
  },
  pages: {
    signIn: "/",
  },
});
