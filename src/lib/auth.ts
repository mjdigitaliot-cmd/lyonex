import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { db } from "@/lib/db";

const loginSchema = z.object({
  identifier: z.string().min(3),
  password: z.string().min(8)
});

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/login"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Phone", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const identifier = parsed.data.identifier.trim().toLowerCase();
        const user = await db.user.findFirst({
          where: {
            OR: [{ email: identifier }, { phone: parsed.data.identifier.trim() }],
            isActive: true
          }
        });

        if (!user?.passwordHash) return null;

        const passwordOk = await bcrypt.compare(parsed.data.password, user.passwordHash);
        if (!passwordOk) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        } as any;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub;
        (session.user as any).role = token.role;
      }
      return session;
    }
  }
};
