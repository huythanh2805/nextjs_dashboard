import prisma from "@/lib/db"
import {v4 as uuid} from 'uuid'
export const getForgetPasswordbyEmail = async (email: string) => {
    try {
        const forgetPasswordToken = await prisma.forgetPasswordToken.findUnique({
            where: {email}
        })
        return forgetPasswordToken
    } catch (error) {
        return null
    }
}
export const getForgetPasswordbyToken = async (token: string) => {
    try {
        const forgetPasswordToken = await prisma.forgetPasswordToken.findUnique({
            where: {token: token.toUpperCase()}
        })
        return forgetPasswordToken
    } catch (error) {
        return null
    }
}
export const generateForgetPasswordToken = async (email: string) => {
    const exprire = new Date().getTime() + 3600 * 1000
    const token = generate6RandomLetters()
    try {
    const forgetPasswordToken = await getForgetPasswordbyEmail(email)

    if(forgetPasswordToken){
        await prisma.forgetPasswordToken.delete({
            where: {
                id: forgetPasswordToken.id
            }
        })
    }
    const newForgetPasswordToken = await prisma.forgetPasswordToken.create({
        data: {
            email,
            token,
            exprire: new Date(exprire)
        }
    })
    return newForgetPasswordToken.token
    } catch (error) {
        return null
    }

}
function generate6RandomLetters() {
    const uuID = uuid(); // Tạo UUID
    let lettersOnly = uuID.replace(/[^a-zA-Z]/g, ''); // Loại bỏ số và ký tự khác
    while (lettersOnly.length < 6) {
        lettersOnly += uuid().replace(/[^a-zA-Z]/g, ''); // Bổ sung thêm nếu thiếu
    }
    return lettersOnly.slice(0, 6).toUpperCase(); // Lấy 6 ký tự đầu tiên
}