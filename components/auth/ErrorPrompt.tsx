import React from 'react'
import { BiSolidError } from 'react-icons/bi'

type Props = {
    error: string
}
const ErrorPrompt: React.FC<Props> = ({error}) => {
    return (
        <div className='w-full px-3 py-3 mb-4 rounded-lg flex items-center bg-red-300 text-red-600 font-normal text-lg '>
            <BiSolidError className='text-2xl mr-2' />
            {error === "OAuthAccountNotLinked" ? "Email in use with a different provider" : error}
        </div>
    )
}

export default ErrorPrompt