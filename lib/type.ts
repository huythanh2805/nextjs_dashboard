import { Customer, Invoice } from "@prisma/client";

export type Revenue = {
    month: string;
    revenue: number;
};
export type InvoiceWithCostomer = Omit<Invoice, 'customer_id'> & {
    customer: Customer
}