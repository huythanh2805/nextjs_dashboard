import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { LoginSchame } from "./lib/schema"
import { getUserByEmail } from "./data/user"
import bcrypt from "bcryptjs"
import Google from "next-auth/providers/google"
export default {
  trustHost: true,
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const {data, success} = LoginSchame.safeParse(credentials)
        if(!success) return null
        const {email, password} = data

        const user = await getUserByEmail(email)
        if (!user || !user.password) return null

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(!isPasswordMatch) return null
        return user
      },
    }),
  ],
} satisfies NextAuthConfig
