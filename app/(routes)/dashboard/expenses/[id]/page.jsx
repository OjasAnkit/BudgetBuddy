// we have created a dynamic route here using the id column present in the categories db
// e.g., let's say the house category has an id of 4, the route for that will be dashboard/expense/4 & similarly for other ids as well
'use client'
import { db } from '@/utils/dbConfig'
import { useUser } from '@clerk/nextjs'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { categories, expenses } from "@/utils/schema";
import CategoryItem from '../../categories/_components/CategoryItem'
import AddExpense from './_components/AddExpense'
import ExpenseListTable from './_components/ExpenseListTable'
import { Button } from '@/components/ui/button'
import { PenBox, Trash } from 'lucide-react'

// imports for delete button alert dialoge
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ChevronRightIcon } from '@radix-ui/react-icons'
import EditExpense from './_components/EditExpense'

function Expenses({ params }) { // Here params is an object that contains the dynamic segments (parameters) from a URL in a web application. It allows us to capture values from the URL and use them in our code. In general the params object contains various properties, but for our use case we can simply extract the id to fetch category ID

  const { user } = useUser();
  const [categoryInfo, setCategoryInfo] = useState('');
  const [expenseList, setExpenseList] = useState();
  const route = useRouter();

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

    // console.log(result[0])
    getExpenses();
    setCategoryInfo(result[0]);
  }

  // getting all the expenses pertaining to the given category info to display on the page
  const getExpenses = async () => {
    const result = await db.select()
      .from(expenses)
      .where(eq(expenses.category_id, params.id)) // params.id -> category id, and expenses.category_id -> category id of each expense
      .orderBy(desc(expenses.id)) // sorting by desc to get the latest expense on top

    // console.log(result)
    setExpenseList(result)
  }

  // function to delete a whole category
  const deleteCategory = async () => {

    const tempName = categoryInfo.name;

    const deleteExpenses = await db.delete(expenses)
      .where(eq(expenses.category_id, params.id))
      .returning();

    if (deleteExpenses) {
      const result = await db.delete(categories)
        .where(eq(categories.id, params.id))
        .returning();
    }

    toast("Expense category deleted!✅", {
      description: `You have successfully deleted the ${tempName} category.`,
    })
    route?.replace('/dashboard/categories');
  }


  return (
    <div className='p-10'>
      <h2 className='font-bold text-3xl flex items-center justify-between'>My Expenses
        <div className='flex gap-2 items-center'>

          {/* Update Button */}
          <EditExpense
            categoryInfo={categoryInfo}
            refreshData={() => getCategoryInfo()}
          />

          {/* Delete Button */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon" className='shadow-md'> {/**Adding the delete button as the trigger */}
                <Trash className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the current category
                  and remove all the expenses from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteCategory()}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
        {
          categoryInfo ? // if category info is not loaded, show skeleton loading effect
            <CategoryItem category={categoryInfo} /> :
            <div className='h-[150px] w-full bg-slate-200 rounded-lg animate-pulse'>

            </div>
        }
        <AddExpense
          categoryName={categoryInfo.name}
          categoryID={params?.id}
          user={user}
          refreshData={() => getCategoryInfo()}
        />
      </div>
      <div className='mt-4'>
        <h2 className='font-bold text-lg'>Latest Expenses</h2>
        <ExpenseListTable
          expenseList={expenseList}
          categoryName={categoryInfo.name}
          refreshData={() => getCategoryInfo()} />
      </div>
    </div>
  )
}

export default Expenses