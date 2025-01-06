import { z } from "zod";

export const CreateInVoiceSchema = z.object({
  customer_id: z.string(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"]),
  date: z.date()
})
export const UpdateInvoiceSchema = z.object({
  id: z.string(),
  customer_id: z.string(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"]),
  date: z.date(),
  createdAt: z.date(),
  updatedAt: z.date()
})