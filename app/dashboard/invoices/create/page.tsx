import Breadcrumbs from "@/components/Invoices/breadcrumbs";
import Form from "@/components/Invoices/create-form";

export default async function CreateInvoicePage() {
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
      {/* <Form customers={customers} /> */}
    </main>
  );
  }