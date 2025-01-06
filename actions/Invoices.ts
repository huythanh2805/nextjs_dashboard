"use server"
import { z } from "zod"
import prisma from "@/lib/db"
import { CreateInVoiceSchema, UpdateInvoiceSchema } from "@/lib/schema"
import { revalidateTag } from "next/cache"
import { Invoice } from "@prisma/client"

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

export const deleteInvoice = async (id: string): Promise<{success?: string, error?: string}>  =>{
   await prisma.invoice.delete({
    where: {
      id
    }
   })
   return {success: "Bạn đã xóa thành công"}
}

export const getDetailInvoice = async (id?: string): Promise<{invoiceDetail?: Invoice, error?: string}> => {
  const invoiceDetail = await prisma.invoice.findUnique({
    where: {
      id
    },
  })
  if(!invoiceDetail) return {error: "Không thể tìm thấy chi tiết hóa đơn"}
  return {invoiceDetail}
}

export const updateInvoice = async (data: Invoice): Promise<{success?: string, error?: string}> => {
  const {success, error, data: updateData} = UpdateInvoiceSchema.safeParse(data)
  if(error) return {error: "Dữ liệu đầu vào không hợp lệ"}
  const updatedInvoice = await prisma.invoice.update({
    where: {
      id: updateData.id
    },
    data: updateData
  })
  if(!updatedInvoice) return {error: "Cập nhập thất bại"}
  return {success: "Bạn đã cập nhật thành công"}
}