"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { CheckIcon, ClockIcon, CurrencyDollarIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import ButtonCustomed from "../button";
import { Customer, InvoiceStatus } from "@prisma/client";
import { UpdateInvoiceSchema } from "@/lib/schema";
import { getDetailInvoice, updateInvoice } from "@/actions/Invoices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { ErrorToast, SuccessToast } from "../Toasts";
import { useRouter } from "next/navigation";
type Props = {
   customers: Customer[],
   invoiceId?: string
}
const UpdateFormInvoice: React.FC<Props> = ({ customers, invoiceId }) => {
    const navigate = useRouter()
// Zod form
    const form = useForm({
    resolver: zodResolver(UpdateInvoiceSchema),
    defaultValues: {
        id: "",
        customer_id:  "",
        amount: 0,
        status:"pending",
        date:new Date(),
        createdAt:new Date(),
        updatedAt:new Date(),
    },
    });
// React query
  const queryClient = useQueryClient()
  const {data: Invoice} = useQuery({
    queryKey: ["GetUpdateInvoice"],
    queryFn: () => getDetailInvoice(invoiceId)
  })
// React query Mutation 
  const {mutate: UpdateInvoice} = useMutation({
    mutationFn: updateInvoice,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getAllInvoices"]})
      queryClient.invalidateQueries({ queryKey: ["GetUpdateInvoice"]})
      navigate.push('/dashboard/invoices')
      SuccessToast(data.success)
    },
    onError: (data) => {
        ErrorToast(data.message)
    }
  })
//  Cập nhật lại trạng thái khi được dữ liệu invoice detail được cập nhật thành công
  useEffect(() => {
    if (Invoice?.invoiceDetail) {
      form.reset({
        id: Invoice.invoiceDetail.id,
        customer_id: Invoice.invoiceDetail.customer_id,
        amount: Invoice.invoiceDetail.amount,
        status: Invoice.invoiceDetail.status,
        date: Invoice.invoiceDetail.date,
        createdAt: Invoice.invoiceDetail.createdAt,
        updatedAt: Invoice.invoiceDetail.updatedAt,
      });
    }
  }, [Invoice, form]);

  const onSubmit = async (data: z.infer<typeof UpdateInvoiceSchema>) => {
    UpdateInvoice(data)
  };

  return (
    <Form {...form}>
    <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
            ...form.getValues(),
            status: form.getValues().status as InvoiceStatus
        })
    }}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <FormField
            name="customer_id"
            control={form.control}
            render={({ field }) => (
            <FormItem>
                <FormLabel>Choose customer</FormLabel>
                <FormControl>
                <div className="relative">
                    <select
                    {...field}
                    className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    >
                    <option value="" disabled>
                        Select a customer
                    </option>
                    {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                        {customer.name}
                        </option>
                    ))}
                    </select>
                    <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                </div>
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />

        {/* Invoice Amount */}
        <FormField
            name="amount"
            control={form.control}
            render={({ field }) => (
            <FormItem>
                <FormLabel>Choose an amount</FormLabel>
                <FormControl>
                <div className="relative">
                    <input
                    {...field}
                    type="number"
                    step="0.01"
                    placeholder="Enter USD amount"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                    <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />

        {/* Invoice Status */}
        <fieldset>
            <legend className="mb-2 block text-sm font-medium">Set the invoice status</legend>
            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
                {["pending", "paid"].map((status) => (
                <FormField
                    key={status}
                    name="status"
                    control={form.control}
                    render={({ field }) => (
                    <div className="flex items-center">
                        <input
                        {...field}
                        type="radio"
                        value={status}
                        checked={field.value === status}
                        className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                        onChange={(e) => field.onChange(e.target.value)}
                        />
                        <label
                        htmlFor={status}
                        className={`ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
                            status === "paid" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-600"
                        }`}
                        >
                        {status === "pending" ? "Pending" : "Paid"}
                        {status === "pending" ? (
                            <ClockIcon className="h-4 w-4" />
                        ) : (
                            <CheckIcon className="h-4 w-4" />
                        )}
                        </label>
                    </div>
                    )}
                />
                ))}
            </div>
            </div>
        </fieldset>
        
        </div>

        <div className="mt-6 flex justify-end gap-4">
        <Link
            href="/dashboard/invoices"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
            Cancel
        </Link>
        <ButtonCustomed type="submit">Update Invoice</ButtonCustomed>
        </div>
    </form>
    </Form>
  );
}
export default UpdateFormInvoice