"use server"
import prisma from "@/lib/db"

export const useGetCustomer = async () => {
   const customers = await prisma.invoice.findMany({})
   return customers
}