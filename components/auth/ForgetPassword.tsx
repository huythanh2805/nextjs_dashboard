"use client"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import InputCustomed from '../InputCustomed'
import ButtonCustome from '../ButtonCustomed'
import { useState, useTransition } from "react"
import { forgetPasswordSchame } from "@/lib/schema"
import ErrorPrompt from "./ErrorPrompt"
import SuccessPrompt from "./SuccessPrompt"
import { sendingForgetPasswordToken, updatePassword, verifyForgetPasswordCode } from "@/actions/ForgetPasswordToken"
import { toast } from "@/hooks/use-toast"

type Props = {
   setIsForgetPassword: (value: boolean) => void
}
const ForgetPassword: React.FC<Props> = ({setIsForgetPassword}) => {
  const [isEmailInputOpen, setIsEmailInputOpen] = useState<boolean>(true)
  const [isCodeInputOpen, setIsCodeInputOpen] = useState<boolean>(false)
  const [isPasswordInputOpen, setIsPasswordInputOpen] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")
  const [isPending, startTransiton] = useTransition()
      // 1. Define your form.
  const form = useForm<z.infer<typeof forgetPasswordSchame>>({
    resolver: zodResolver(forgetPasswordSchame),
    defaultValues: {
      email: "",
      code: undefined,
      password: ""
    },
  })
 
  // 2. Define a submit handler.
 async function onSubmit(values: z.infer<typeof forgetPasswordSchame>) {
    const {error, data} = forgetPasswordSchame.safeParse(values)
    if(error) return setError('Invalid fields')
    const {email, code, password } = data
    
    // Xử lí gửi code đến email
    if(isEmailInputOpen){
      startTransiton(() => {
        sendingForgetPasswordToken(email)
        .then((data) => {
          const {error, success} = data
          if(error) return setError(error)
          if(success) {
            toast({title: success})
            setIsCodeInputOpen(true)
            setIsEmailInputOpen(false)
          }
        })
        .catch(error => {
          setError("Something went wrong")
        })
      })
    }
    // Xử lí nếu là đang nhập code
    if(isCodeInputOpen && code) {
      startTransiton(() => {
        verifyForgetPasswordCode(code)
        .then((data) => {
          const {error, success} = data
          if(error) return setError(error)
          if(success) {
            toast({title: success})
            setError("")
            setIsPasswordInputOpen(true)
            setIsCodeInputOpen(false)
          }
        })
        .catch(error => {
          setError("Something went wrong")
        })
      })
    }
    // Xử lí thay đổi password
    if(isPasswordInputOpen && password) {
      startTransiton(() => {
        updatePassword({email, password})
        .then((data) => {
          const {error, success} = data
          if(error) setError(error)
          if(success) setSuccess(success)
        })
        .catch(error => {
          setError("Something went wrong")
        })
      })
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-3">
        {
            isEmailInputOpen &&
                  <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                          <FormItem>
                              <FormControl>
                                  <InputCustomed
                                      type={'text'}
                                      placeHolder={'Email'}
                                      value={field.value}
                                      setValue={field.onChange}
                                  />
                              </FormControl>
                              <FormDescription>
                                  Enter your email we will send you a code to fill a input
                              </FormDescription>
                              <FormMessage />
                          </FormItem>
                      )}
                  />
        }
        {
            isCodeInputOpen &&
                  <FormField
                      control={form.control}
                      name="code"
                      render={({ field }) => (
                          <FormItem>
                              <FormControl>
                                  <InputCustomed
                                      type={'text'}
                                      placeHolder={'code'}
                                      value={field.value}
                                      setValue={field.onChange}
                                  />
                              </FormControl>
                              <FormDescription>
                                  Enter the code which we sent you to modify your password
                              </FormDescription>
                              <FormMessage />
                          </FormItem>
                      )}
                  />
        }
        {
            isPasswordInputOpen &&
                  <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                          <FormItem>
                              <FormControl>
                                  <InputCustomed
                                      type={'text'}
                                      placeHolder={'password'}
                                      value={field.value}
                                      setValue={field.onChange}
                                  />
                              </FormControl>
                              <FormDescription>
                                  Enter your new password
                              </FormDescription>
                              <FormMessage />
                          </FormItem>
                      )}
                  />
        }
        {
          error &&
          <ErrorPrompt error={error} />
        }
        {
          success &&
          <SuccessPrompt success={success} />
        }
        <div className="w-full flex justify-end">
         <div onClick={() => setIsForgetPassword(false)} className='hover:underline cursor-pointer hover:text-blue-700'>Đăng nhập ?</div>
        </div>
        <ButtonCustome buttonText={
          isEmailInputOpen ? "Lấy code" : isCodeInputOpen ? "Đổi mật khẩu" : "Cập nhật"
        } loading={isPending} />
      </form>
    </Form>
  )
}

export default ForgetPassword