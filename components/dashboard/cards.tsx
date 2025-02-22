import { fetchAllCard } from '@/lib/data';
import { lusitana } from '@/lib/font';
import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};
const CardWrapper = async () => {
   const {
    totalInvoices,
    totalCustomers,
    pendingInvoices,
    paidInvoices
  } = await fetchAllCard();
  return (
    <>
      {/* NOTE: Uncomment this code in Chapter 9 */}

      <Card title="Collected" value={paidInvoices} type="collected" />
      <Card title="Pending" value={pendingInvoices} type="pending" />
      <Card title="Total Invoices" value={totalInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={totalCustomers}
        type="customers"
      />
    </>
  );
}
export default CardWrapper
export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}

