import prisma from "@/lib/db"
import {v4 as uuid} from 'uuid'
export const getVerificationtokenByEmail = async (email: string) => {
    try {
        const verificationToken = await prisma.verificationToken.findUnique({
            where: {email}
        })
        return verificationToken
    } catch (error) {
        return null
    }
}
export const getVerificationtokenByToken = async (token: string) => {
    try {
        const verificationToken = await prisma.verificationToken.findUnique({
            where: {token}
        })
        return verificationToken
    } catch (error) {
        return null
    }
}
export const generateVerificationTokenByEmail = async (email: string) => {
    const exprire = new Date().getTime() + 3600 * 1000
    const token = uuid()
    try {
    const verificationToken = await getVerificationtokenByEmail(email)

    if(verificationToken){
        await prisma.verificationToken.delete({
            where: {
                id: verificationToken.id
            }
        })
    }
    const newVerificationToken = await prisma.verificationToken.create({
        data: {
            email,
            token,
            exprire: new Date(exprire)
        }
    })
    return newVerificationToken.token
    } catch (error) {
        return null
    }

}