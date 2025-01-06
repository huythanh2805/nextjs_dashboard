import { fetchFiveLastInvoices } from '@/lib/data';
import { lusitana } from '@/lib/font';
import clsx from 'clsx';
import Image from 'next/image';
import { unstable_cache } from 'next/cache';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { refetchingLastestInvoices } from '@/actions/Invoices';

const LatestInvoices = async () => {
  const cachingData = unstable_cache(async () => {
    return await fetchFiveLastInvoices()
  },
  ['fetchingLatestInvoices'],
  {
    tags: ['fetchingLatestInvoices'],
    revalidate: false
  }
)
  const latestInvoices = await cachingData()
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Invoices
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: Uncomment this code in Chapter 7 */}

        <div className="bg-white px-6">
          {latestInvoices.map((invoice, i) => {
            return (
              <div
                key={invoice.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <Image
                    src={invoice.customer.image_url}
                    alt={`${invoice.customer.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {invoice.customer.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {invoice.customer.email}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  {invoice.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className="pb-2 pt-6 ">
          <form 
           action={refetchingLastestInvoices}
          >
            <button
              type='submit'
              className='group cursor-pointer flex items-center'
            >
            <ArrowPathIcon className="h-5 w-5 text-gray-500 group-hover:text-red-500 " />
            <h3 className="ml-2 text-sm text-gray-500 group-hover:text-red-500 ">Updated just now</h3>
           </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LatestInvoices