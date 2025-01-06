"use client"
import { toast } from '@/hooks/use-toast'

export const ErrorToast = (title: string = "Thất bại") => {
  return toast({title, variant: "destructive"})
}
export const SuccessToast = (title: string = "Thành công") => {
  return toast({title})
}

 