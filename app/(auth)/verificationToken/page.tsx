"use client"
import { verifyTokenAction } from '@/actions/VerificationToken'
import { LoadingAnimation, SuccessAnimation } from '@/components/animation'
import ErrorPrompt from '@/components/auth/ErrorPrompt'
import SuccessPrompt from '@/components/auth/SuccessPrompt'
import AuthCardWrapper from '@/components/AuthCardWrapper'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState, useTransition } from 'react'

type Props = {
    searchParams: {
        token: string
    }
}
const VerificationTokenPage: React.FC<Props> = ({searchParams}) => {
  const {token} = searchParams
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useRouter()
  
  const handleLoginNavigate = () => {
    navigate.replace('/login')
  }
  useEffect(() => {
   if(!token) return
   if(success) return
   startTransition(() => {
    verifyTokenAction(token)
    .then(data => {
      const {error, success} = data
      if(error) setError(error)
      if(success) setSuccess(success)

    }).catch(error => {
       setError("Something went wrong")
    })
    
   })
  },[token])

  return (
    <main className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-slate-400 to-blue-500">
      <section className="w-screen flex items-center justify-center">
        {
          token && (
           <AuthCardWrapper
            title="Verification"
            >
              {isPending && !error && !success && <LoadingAnimation/>} 
              {
                success && <div className='absolute'>
                <SuccessAnimation/>
                </div>
              }
              {
                success &&  <div>
                  <div className='pt-3 flex flex-col items-end'>
                  <SuccessPrompt success={success} />
                  <div onClick={handleLoginNavigate} className='max-w-max hover:underline cursor-pointer hover:text-blue-700'>Đăng nhập ngay ?</div>
                  </div>  
                </div>
              }
              {
                error &&  <div>
                  <div className='pt-3 flex flex-col items-end'>
                  <ErrorPrompt error={error} />
                  <div onClick={handleLoginNavigate} className='max-w-max hover:underline cursor-pointer hover:text-blue-700'>Đăng nhập ngay ?</div>
                  </div>  
                </div>
              }
            </AuthCardWrapper>
            )
        }
      </section>
    </main>
  )
}

export default VerificationTokenPage