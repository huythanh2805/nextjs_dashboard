import { FcGoogle } from "react-icons/fc";
import { rougeScript } from '@/lib/font';
import { EyesAnimation } from './animation';
import { signIn } from "@/auth";
import { handleLoginWithGoogle } from "@/actions/Auth";
type Props = {
    children: React.ReactNode
    title: string
}
const AuthCardWrapper: React.FC<Props> = ({children, title}) => {
  return (
    <div className='min-w-[400px] rounded-lg bg-white shadow-panelShadown shadow-neutral-500 pt-2 pb-8 px-5 flex flex-col '>
      <div className='w-full flex flex-col items-center justify-center gap-2'>
        <h2 className={`${rougeScript.className} text-[40px]`}>{title}</h2>
       <div className='max-w-[250px] min-h-[46px]'>
       <EyesAnimation/>
       </div>
      </div>
      {children}
      <div className='w-full flex items-center justify-center py-6'>
         <p className='flex-1 h-[1px] bg-gray-2'></p>
         <p className='px-2 text-gray-1'>Or</p>
         <p className='flex-1 h-[1px] bg-gray-2'></p>
      </div>
      <form action={handleLoginWithGoogle}>
        <button 
          type="submit"
          className='relative w-full cursor-pointer flex items-center justify-center rounded-md shadow-shadownButton
          hover:shadow-neutral-500 shadow-neutral-300 transition duration-300 py-3'>
          <FcGoogle  className='absolute top-[50%] left-4 translate-y-[-50%] text-2xl' />
          <p className='text-lg'>Đăng nhập với google</p>
        </button>
      </form>
    </div>
  )
}

export default AuthCardWrapper