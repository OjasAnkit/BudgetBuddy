import { db } from '@/utils/dbConfig';
import categories from '@/utils/schema';
import Link from 'next/link';
import React, { useState } from 'react';

function CategoryItem({ category }) {

    const calculateProgressPercentage = () => {
        let progressPercentage = 100 * category.totalSpent / category.amount; // total spent % is basically how much out of the total amount the user has already spent
        if (progressPercentage > 100) {
            return 100;
        }
        else return progressPercentage;
    }

    return (
        <Link href={'/dashboard/expenses/' + category?.id}>
            <div className='p-5 border rounded-lg hover:shadow-md cursor-pointer h-[170px]'>
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
                <div className='mt-5'>
                    <div className='flex mb-3 items-center justify-between'>
                        <h2 className='text-xs text-slate-500'>&#x20b9;{Number(category?.totalSpent).toLocaleString("en-IN") ? Number(category?.totalSpent).toLocaleString("en-IN") : 0} spent</h2>
                        <h2 className='text-xs text-slate-500'>&#x20b9;{Number(category?.amount - category?.totalSpent).toLocaleString("en-IN")} left
                        </h2>
                    </div>
                    <div className='w-full bg-slate-300 h-2 rounded-full'> {/*added progress bar, the % is dynamically calculated based on the expense and category*/}
                        <div className='bg-primary h-2 rounded-full'
                            style={{ width: `${calculateProgressPercentage()}%` }}>
                            {/* calculating the progress % dynamically and assigning the value to the progress bar */}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CategoryItem;
