import { z } from "zod";

export const RegisterSchame = z.object({
  email: z.string().email({message: "Email không hợp lệ"}),
  password: z.string({required_error: "Bạn cần nhập mật khẩu"}),
  confirmPassword: z.string({required_error: "Bạn cần nhập xác nhận mật khẩu"}),
}).superRefine((data, ctx) => {
   const {password, confirmPassword} = data
   if(password !== confirmPassword) {
    ctx.addIssue({
      code: "custom",
      path: ['confirmPassword'],
      message: "Xác nhận mật khẩu không trùng nhau"
    })
   }
})
export const LoginSchame = z.object({
  email: z.string().email({message: "Email không hợp lệ"}),
  password: z.string({required_error: "Bạn cần nhập mật khẩu"}),
})
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