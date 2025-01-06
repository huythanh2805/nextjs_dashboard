import Breadcrumbs from '@/components/Invoices/breadcrumbs'
import UpdateFormInvoice from '@/components/Invoices/update-form'
import prisma from '@/lib/db'
import { Customer } from '@prisma/client'
// import Form from "@/components/Invoices/create-form";
type Props = {
    params: {
        invoiceId: string
    }
}
// export const dynamic = "force-dynamic"
const UpdateInvoice: React.FC<Props> = async ({ params }) => {
    const customers: Customer[] = await prisma.customer.findMany({})
    const id = params.invoiceId
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Invoices', href: '/dashboard/invoices' },
                    {
                        label: 'Update Invoice',
                        href: '/dashboard/invoices/'+id,
                        active: true,
                    },
                ]}
            />
            <UpdateFormInvoice customers={customers} invoiceId={id} />
        </main>
    )
}

export default UpdateInvoice