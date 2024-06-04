import { db } from '@/utils/dbConfig'
import { expenses } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Trash } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

export default function ExpenseListTable({ expenseList, refreshData }) {

    const deleteExpense = async (expense) => {
        const result = await db.delete(expenses)
            .where(eq(expenses.id, expense.id))
            .returning();

        if (result) {
            refreshData(); //using to refresh the expense table after deleting expense
            toast(`Expense Deleted!😁`, {
                description: `You have successfully deleted '${expense.name}' expense.`,
            });
        }
    }

    return (
        <div className='mt-3'>
            <h2 className='font-bold text-lg mb-3 mt-5'>Latest Expenses</h2>
            <div className='grid grid-cols-4 bg-blue-50 p-2 font-bold'>
                <h2>Name</h2>
                <h2>Amount</h2>
                <h2>Date</h2>
                <h2>Action</h2>
            </div>
            {expenseList?.map((expenses, index) => (
                <div className='grid grid-cols-4 bg-slate-50 p-2'>
                    <h2>{expenses.name}</h2>
                    <h2>&#x20b9;{Number(expenses?.amount).toLocaleString("en-IN")}</h2>
                    <h2>{expenses.createdAt}</h2>
                    <h2 className='text-red-600 cursor-pointer items-center' // on clicking the delete button, calling the delete expense function, and passing the expense to be deleted
                    ><Trash onClick={() => deleteExpense(expenses)}></Trash></h2>
                </div>
            ))}
        </div>
    )
}
