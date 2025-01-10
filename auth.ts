import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/db"
import Google from "next-auth/providers/google"
import authConfig from "./auth.config"
import { getUserById } from "./data/user"

export const { auth, handlers, signIn, signOut } = NextAuth({
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            console.log('signIn')
          return true
        },
        async session({ session, user, token }) {
            session.user.role = token.role as string
            console.log(session)
          return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
          if(!token.sub) return token
          const existedUser = await getUserById(token.sub)
          if(!existedUser) return token
          token.role = existedUser?.role
          return token
        }
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
    
})