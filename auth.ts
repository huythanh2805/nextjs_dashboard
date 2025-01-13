import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/db"
import Google from "next-auth/providers/google"
import authConfig from "./auth.config"
import { getUserById } from "./data/user"

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
   signIn: "/login",
   error: "/login",
  },
  events: {
    async linkAccount({user}){
        await prisma.user.update({
          where: {id: user.id},
          data: {emailVerified: new Date()}
        })
    }
  },
  callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
         if(account?.provider !== "credentials") return true
        if(!user || !user.id) return false
        const existingUser = await getUserById(user.id)
        if(!existingUser?.emailVerified) return false
        return true
      },
      async session({ session, user, token }) {
          session.user.role = token.role as string
          if(!token.sub) return session
          session.user.id = token.sub
        return session
      },
      async jwt({ token, user, account, profile, isNewUser }) {
        if(!token.sub) return token
        const existingUser = await getUserById(token.sub)
        if(!existingUser) return token
        token.role = existingUser?.role
        return token
      }
  },
  secret: process.env.NEXTAUTH_SECRET,
  
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
    
})