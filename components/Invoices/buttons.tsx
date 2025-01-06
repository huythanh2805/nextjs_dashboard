"use client"
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import PromptDialog from '../PromptDialog';
import { deleteInvoice } from '@/actions/Invoices';
import { toast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Invoice</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}
export function DeleteInvoice({ id }: { id: string }) {
  const queryClient = useQueryClient()

  const handleClick = async (id: string) => {
    const {success, error} = await deleteInvoice(id)
    console.log({error})
    if(success) {
     toast({title: success})
     queryClient.invalidateQueries({queryKey: ['getAllInvoices']})
    }
  }
  return (
    <>
      <PromptDialog 
       title='Xóa'
       handleClick={() => handleClick(id)}
      >
      <div className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </div>
      </PromptDialog>
    </>
  );
}
