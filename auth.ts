import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/db"
import { getUserById } from "@/lib/queries/user"
import authConfig from "@/auth.config"

export const { 
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
  // @ts-ignore
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    // error: "/auth/error",
  },
  callbacks: {
    async session({ token, session }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }
  
        if (token.email) {
          session.user.email = token.email;
        }

        session.user.name = token.name;
        session.user.image = token.picture;
        session.user.role = token.role;
        session.user.isActive = token.isActive;
      }

      return session
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const dbUser = await getUserById(token.sub);

      if (!dbUser || !dbUser.isActive) return;

      token.name = dbUser.name;
      token.email = dbUser.email;
      token.picture = dbUser.image;
      token.role = dbUser.role;
      token.isActive = dbUser.isActive;

      return token;
    },
  },
  ...authConfig,
  debug: process.env.NODE_ENV !== "production"
})