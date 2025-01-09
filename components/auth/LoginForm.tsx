"use client"
import InputCustomed from '../InputCustomed'
import ButtonCustome from '../ButtonCustomed'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { z } from "zod"
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
 
const formSchema = z.object({
  username: z.string().email({message: "Email không hợp lệ"}),
  password: z.string({required_error: "Bạn cần nhập mật khẩu"})
})
const LoginForm = () => {
    const navigate = useRouter()
      // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  const handleLoginNavigate = () => {
    navigate.push('/register')
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="pt-3">
         {/* Email */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem
            className='pb-8'
            >
              <FormControl>
                <InputCustomed
                 type={'text'}
                 placeHolder={'Email'}
                 value={field.value}
                 setValue={field.onChange}
                  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem
            >
              <FormControl>
                <InputCustomed
                 type={'password'}
                 placeHolder={'Password'}
                 value={field.value}
                 setValue={field.onChange}
                  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='w-full flex items-center justify-end py-2 pb-4'>
        <div onClick={handleLoginNavigate} className='hover:underline cursor-pointer hover:text-blue-700' >Bạn chưa có tài khoản ?</div>
        </div>
        <ButtonCustome buttonText='Đăng nhập' />
      </form>
    </Form>
  )
}

export default LoginForm