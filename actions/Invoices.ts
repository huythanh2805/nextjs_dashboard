"use server"
import { z } from "zod"
import { Invoice } from "@prisma/client"
import prisma from "@/lib/db"
const CreateInVoiceSchema = z.object({
  customer_id: z.string(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"]),
  date: z.date()
})
export async function createInvoice(formData: FormData) {
  const rawFormData = {
    customer_id: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
    date: new Date(),
  }
//   Validate 1 lần nữa ở server dựa trên zod
  const validateFileds = CreateInVoiceSchema.safeParse(rawFormData)
  const { success, data: validataData, error } = validateFileds
  if(error) return
  await prisma.invoice.create({
    data : validataData
  })
  
}
