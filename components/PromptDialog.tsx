"use client"
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ButtonCustomed from './button'

type Props = {
    children: React.ReactNode,
    title: string,
    handleClick: () => void
}
const PromptDialog: React.FC<Props> = ({ children, title, handleClick }) => {
    return (
        <Dialog>
            <DialogTrigger>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription className='w-full py-3 flex items-center justify-end gap-2'>
                        <DialogTrigger>
                            <ButtonCustomed>
                                Hủy
                            </ButtonCustomed>
                        </DialogTrigger>
                        <DialogTrigger>
                        <ButtonCustomed onClick={handleClick} className='bg-red-500 hover:bg-red-400'>
                            {title}
                        </ButtonCustomed>
                        </DialogTrigger>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default PromptDialog