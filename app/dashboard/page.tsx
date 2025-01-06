import CardWrapper from "@/components/dashboard/cards";
import LatestInvoices from "@/components/dashboard/latest-invoices";
import RevenueChart from "@/components/dashboard/revenue-chart";
import { CardsSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from "@/components/skeletons";
import { lusitana } from "@/lib/font";
import { Suspense } from "react";

// export const dynamic = "force-dynamic"
export default async function DashboardPage() {
  return <main>
    <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
      Dashboard
    </h1>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <Suspense fallback={<CardsSkeleton />}>
        <CardWrapper />
      </Suspense>
    </div>
    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
      <Suspense fallback={<RevenueChartSkeleton/>}>
        <RevenueChart />
      </Suspense>
      <Suspense fallback={<LatestInvoicesSkeleton />}>
      <LatestInvoices />
      </Suspense>
    </div>
  </main>
}