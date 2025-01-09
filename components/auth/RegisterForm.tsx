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
import { useRouter } from 'next/navigation'
import { RegisterSchame } from '@/lib/schema'
import { useTransition } from 'react'
import { RegisterAction } from '@/actions/Auth'
import { toast } from '@/hooks/use-toast'

const RegisterForm = () => {
  const navigate = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof RegisterSchame>>({
    resolver: zodResolver(RegisterSchame),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })
  function onSubmit(values: z.infer<typeof RegisterSchame>) {
    startTransition(() => {
      RegisterAction(values).then((data)=>{
        const {success, error} = data
        if(success) {
          toast({title: success})
          form.reset()
        }
        if(error) toast({title: error, variant: "destructive"})
      })
    })
  }
  const handleRegisterNavigate = () => {
    navigate.push('/login')
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="pt-3">
         {/* Email */}
        <FormField
          control={form.control}
          name="email"
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
            className='pb-8'
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
         {/* Confirme Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputCustomed
                 type={'password'}
                 placeHolder={'Confirm password'}
                 value={field.value}
                 setValue={field.onChange}
                  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='w-full flex items-center justify-end py-4 pb-6'>
          <div onClick={handleRegisterNavigate} className='hover:underline cursor-pointer hover:text-blue-700' >Bạn đã có tài khoản ?</div>
        </div>
        <ButtonCustome buttonText='Đăng kí' loading={isPending} />
      </form>
    </Form>
  )
}

export default RegisterForm