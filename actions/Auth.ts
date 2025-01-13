"use server"
import { getUserByEmail } from "@/data/user"
import { LoginSchame, RegisterSchame } from "@/lib/schema"
import { z } from "zod"
import bcrypt from 'bcryptjs'
import prisma from '@/lib/db'
import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { defaultRouteRedirect } from "@/Routes"
import { verificationTokenSendEmail } from "@/lib/nodemailer"
import { generateVerificationTokenByEmail } from "@/data/verificationToken"

type ActionProps = {
    success?: string,
    error?: string
}
export const handleLoginWithGoogle = async () => {
  "use server"
  await signIn("google")
}
export const RegisterAction = async (values: z.infer<typeof RegisterSchame>): Promise<ActionProps> => {
   const {data, success} = RegisterSchame.safeParse(values)
   if(!success) return {error: "Invalid data"}
   const {email, password} = data
  
   const user = await getUserByEmail(email)
   if(user) return {error: "Email đã tồn tại"}

   const newPassword = await bcrypt.hash(password, 10)
   
   try {
     const newUser = await prisma.user.create({
        data: {
            email,
            password: newPassword
        }})
     if(!newUser) return {error: "Không thể tạo user"}

    //  Verify email
    const existingUser = await getUserByEmail(email)
    if(!existingUser?.emailVerified) {
      const token = await generateVerificationTokenByEmail(email)
      if(!token) return {error: "Không thể tạo token"}
      const isSuccess =  await verificationTokenSendEmail(email, token)
      if(!isSuccess) return {error: "Gửi token không thành công"}
      return {success: "Token mới đã được gửi đến email của bạn"}
    }

   } catch (error) {
    console.log(error)
     return {error: "Something went wrong"}
   }
   return {success: "Bạn đã đăng kí thành công"}
}
export const LoginAction = async (values: z.infer<typeof LoginSchame>): Promise<ActionProps> => {
   const {data, success} = LoginSchame.safeParse(values)
   if(!success) return {error: "Invalid data"}
   const {email, password} = data
  
  //  Verify email
   const existingUser = await getUserByEmail(email)
   if(!existingUser?.emailVerified) {
    const token = await generateVerificationTokenByEmail(email)
    if(!token) return {error: "Không thể tạo token"}
    const isSuccess =  await verificationTokenSendEmail(email, token)
    if(!isSuccess) return {error: "Gửi token không thành công"}
    return {success: "Token mới đã được gửi đến email của bạn"}
   }
   try {
     await signIn("credentials", {
      email,
      password,
      redirectTo: defaultRouteRedirect  
     })
   } catch (error) {
    if(error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {error: "Invalid Credentials"}
        case "AccessDenied":
          return {error: "You have to verify your email"}
        default:
          return {error: "Something went wrong"}
      }
    }
   }
   return {success: "Đăng nhập thành công"}
}
