import Breadcrumbs from "@/components/Invoices/breadcrumbs";
import prisma from "@/lib/db";
import { Customer } from "@prisma/client";
import CreateFormInvoice from "@/components/Invoices/create-form";

export default async function CreateInvoicePage() {
  const customers: Customer[] = await prisma.customer.findMany({})
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <CreateFormInvoice customers={customers} />
    </main>
  );
  }