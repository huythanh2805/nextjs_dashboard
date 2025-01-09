"use server"
import { getUserByEmail } from "@/data/user"
import { RegisterSchame } from "@/lib/schema"
import { z } from "zod"
import bcrypt from 'bcryptjs'
import prisma from '@/lib/db'

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