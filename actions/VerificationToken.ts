"use server"
import { getVerificationtokenByToken } from "@/data/verificationToken"
import prisma from "@/lib/db"
type ActionProps = {
    success?: string,
    error?: string
}
export const verifyTokenAction = async (token: string): Promise<ActionProps> => {
   const verificationToken = await getVerificationtokenByToken(token)
   if(!verificationToken) return {error: "Không tìm thấy token"}
   if(new Date(verificationToken.exprire) < new Date()) return {error: "Token đã hết hạn"}
   try {
     await prisma.user.update({
        where: {email: verificationToken.email},
        data: {emailVerified: new Date()}
     })
   //   await prisma.verificationToken.delete({
   //    where: {id: verificationToken.id}
   //   })
     return {success: "Email đã được xác thực thành công"}
   } catch (error) {
      console.log(error)
    return {error: "Something went wrong"}
   }
   
}