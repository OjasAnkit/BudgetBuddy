// we have created a dynamic route here using the id column present in the categories db
// e.g., let's say the house category has an id of 4, the route for that will be dashboard/expense/4 & similarly for other ids as well
'use client'
import { db } from '@/utils/dbConfig'
import { useUser } from '@clerk/nextjs'
import { eq, getTableColumns, sql } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { categories, expenses } from "@/utils/schema";
import CategoryItem from '../../categories/_components/CategoryItem'
import AddExpense from './_components/AddExpense'

function Expenses({ params }) {

  const { user } = useUser();
  const [categoryInfo, setCategoryInfo] = useState();

  useEffect(() => {
    // console.log(params)
    user && getCategoryInfo();
  }, [user])

  const getCategoryInfo = async () => {
    const result = await db
      .select({
        ...getTableColumns(categories),
        totalSpent: sql`sum(cast(${expenses.amount} as numeric))`.mapWith(Number),
        totalCount: sql`count(${expenses.id})`.mapWith(Number),
      })
      .from(categories)
      .where(eq(categories.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(params.id, categories.id))
      .leftJoin(expenses, eq(categories.id, expenses.category_id))
      .groupBy(categories.id)

    //   console.log(result[0])
    setCategoryInfo(result[0]);
  }

  return (
    <div className='p-10'>
      <h2 className='font-bold text-3xl'>My Expenses</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
        {
          categoryInfo ? // if category info is not loaded, show skeleton loading effect
            <CategoryItem category={categoryInfo} /> :
            <div className='h-[150px] w-full bg-slate-200 rounded-lg animate-pulse'>

            </div>
        }
        <AddExpense
          categoryName={params.name}
          categoryID={params.id}
          user={user}
          refreshData={() => getCategoryInfo()} />
      </div>
    </div>
  )
}

export default Expenses