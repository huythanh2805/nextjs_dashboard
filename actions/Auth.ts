"use server"
import { getUserByEmail } from "@/data/user"
import { LoginSchame, RegisterSchame } from "@/lib/schema"
import { z } from "zod"
import bcrypt from 'bcryptjs'
import prisma from '@/lib/db'
import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { defaultRouteRedirect } from "@/Routes"

type ActionProps = {
    success?: string,
    error?: string
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
        default:
          return {error: "Something went wrong"}
      }
    }
   }
   return {success: "Đăng nhập thành công"}
}
