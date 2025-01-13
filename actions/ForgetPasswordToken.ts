"use server"
import { generateForgetPasswordToken, getForgetPasswordbyToken } from "@/data/forgetPasswordToken"
import { forgetPasswordSendEmail } from "@/lib/nodemailer"
import bcrypt from 'bcryptjs'
type ActionProps = {
    success?: string,
    error?: string
}
export const sendingForgetPasswordToken = async (email: string): Promise<ActionProps> => {
   const forgetPasswordToken = await generateForgetPasswordToken(email)
   if(!forgetPasswordToken) return {error: "Không thể tạo mới token"}
   const isSendingSuccess = await forgetPasswordSendEmail(email, forgetPasswordToken)
   if(!isSendingSuccess) return {error: "Không thể gửi email"}
   return {success: "Code đã được gửi đến email của bạn"}
}
export const verifyForgetPasswordCode = async (code: string): Promise<ActionProps> => {
   const forgetPassword = await getForgetPasswordbyToken(code)
   if(!forgetPassword) return {error: "Không tìm thấy code"}
   if(new Date(forgetPassword?.exprire) < new Date()) return {error: "Code đã hết hạn"}
   return {success: "Code đã được xác thực"}
}
export const updatePassword = async ({email, password}:{password: string, email: string}): Promise<ActionProps> => {
   try {
    const newPassword = await bcrypt.hash(password, 10)
    const newUser = await prisma?.user.update({
        where: {email},
        data: {password: newPassword}
    })
    if(!newUser) return {error: "Cập nhật không thành công"}
    await prisma?.forgetPasswordToken.delete({
        where: {email}
    })
    return {success: "Cập nhật thành công mật khẩu"}
   } catch (error) {
    return {error: "Something went wrong"}
   }
}