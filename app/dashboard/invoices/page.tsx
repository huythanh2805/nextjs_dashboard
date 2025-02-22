import { CreateInvoice } from "@/components/Invoices/buttons";
import Pagination from "@/components/Invoices/pagination";
import InvoicesTable from "@/components/Invoices/table";
import Search from "@/components/search";
import { InvoicesTableSkeleton } from "@/components/skeletons";
import { fetchInvoicesPages } from "@/lib/data";
import { lusitana } from "@/lib/font";
import { Suspense } from "react";

type ParamsQuery = {
   query?: string,
   page?: string
}
export default async function InvoicesPage(props: {
  searchParams?: Promise<ParamsQuery> 
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchInvoicesPages(query);
      return (
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search invoices..." />
          <CreateInvoice />
        </div>
         <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
          <InvoicesTable query={query} currentPage={currentPage} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    );
  }