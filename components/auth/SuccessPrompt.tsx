import React from 'react'
import { BiSolidError } from 'react-icons/bi'

type Props = {
    success: string
}
const SuccessPrompt: React.FC<Props> = ({success}) => {
    return (
        <div className='w-full px-3 py-3 mb-4 rounded-lg flex items-center bg-green-300 text-green-600 font-normal text-lg '>
            <BiSolidError className='text-2xl mr-2' />
            {success}
        </div>
    )
}

export default SuccessPrompt