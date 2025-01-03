"use server"
import { z } from "zod"
import prisma from "@/lib/db"
import { CreateInVoiceSchema } from "@/lib/schema"
import { revalidateTag } from "next/cache"

export async function createInvoice(data: z.infer<typeof CreateInVoiceSchema>): Promise<{success?: string, error?: string}> {
//   Validate 1 lần nữa ở server dựa trên zod
  const validateFileds = CreateInVoiceSchema.safeParse(data)
  const { success, data: validataData, error } = validateFileds
  if(error) return {error: "Dữ liệu truyền vào không hợp lệ"}
  await prisma.invoice.create({
    data : validataData
  })
  return {success: "Bạn đã tạo thành công"}
}
export const refetchingLastestInvoices = async () => {
  revalidateTag('fetchingLatestInvoices')
}