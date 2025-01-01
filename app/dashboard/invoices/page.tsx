"use client"

import { useGetCustomer } from "@/actions/Customers";
import prisma from "@/lib/db";
import { BaseUrl } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

const getInvoices = async () => {
  const res = await fetch(`${BaseUrl}/api`,{
    method: "GET"
  })
  const data = await res.json()
  return data
}
export default function InvoicesPage() {
 
    const {data, error, isLoading} = useQuery({
      queryKey: ["getCustomers"],
      queryFn: getInvoices
    })
    console.log({data})
    return <p>InvoicesPage</p>;
  }