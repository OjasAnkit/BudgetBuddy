import categories from '@/utils/schema';
import Link from 'next/link';
import React from 'react';

function CategoryItem({ category }) {
    return (
        <Link href={'/dashboard/expenses/' + category?.id} className='p-5 border rounded-lg hover:shadow-md cursor-pointer h-[170px]'>
            <div className='flex gap-2 items-center justify-between'>
                <div className='flex gap-2 items-center'>
                    <h2 className='text-2xl 
                p-3 px-4 bg-slate-100 
                rounded-full'>{category?.icon}</h2>
                    <div>
                        <h2 className='font-bold'>{category?.name}</h2>
                        <h2 className='text-small text-gray-500'>{category?.totalCount} Items</h2>
                    </div>
                </div>
                <div>
                    <h2 className='font-bold text-lg text-primary'>&#x20b9;{Number(category?.amount).toLocaleString("en-IN")}</h2> {/*added code for adding commas to numbers*/}
                </div>
            </div>
            <div className='mt-5'> {/*added progress bar*/}
                <div className='flex mb-3 items-center justify-between'>
                    <h2 className='text-xs text-slate-500'>&#x20b9;{Number(category?.totalSpent).toLocaleString("en-IN") ? Number(category?.totalSpent).toLocaleString("en-IN") : 0} spent</h2>
                    <h2 className='text-xs text-slate-500'>&#x20b9;{Number(category?.amount - category?.totalSpent).toLocaleString("en-IN")} left
                    </h2>
                </div>
                <div className='w-full bg-slate-300 h-2 rounded-full'>
                    <div className='w-[40%] bg-primary h-2 rounded-full'>

                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CategoryItem;