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
import { LoginSchame } from '@/lib/schema'
import { useTransition } from 'react'
import { LoginAction } from '@/actions/Auth'
import { toast } from '@/hooks/use-toast'
import { defaultRouteRedirect } from '@/Routes'
import { BiSolidError } from "react-icons/bi";
type Props = {
  error?: string
}
const LoginForm: React.FC<Props> = ({ error }) => {
  const navigate = useRouter()
  const [isPending, startTransition] = useTransition()
    // 1. Define your form.
  const form = useForm<z.infer<typeof LoginSchame>>({
    resolver: zodResolver(LoginSchame),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  function onSubmit(values: z.infer<typeof LoginSchame>) {
    startTransition(() => {
      LoginAction(values).then((data)=>{
        const {success, error} = data
        if(success) {
          toast({title: success})
          form.reset()
          navigate.push(defaultRouteRedirect)
        }
        if(error) toast({title: error, variant: "destructive"})
      })
    })
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
        {
          error && 
            <div className='w-full px-3 py-3 mb-4 rounded-lg flex items-center bg-red-400 text-white text-lg font-[300]'>
             <BiSolidError className='text-2xl mr-2' />
             {error === "OAuthAccountNotLinked" ? "Email in use with a different provider" : error}
          </div>
        }
        <ButtonCustome buttonText='Đăng nhập' loading={isPending} />
      </form>
    </Form>
  )
}

export default LoginForm