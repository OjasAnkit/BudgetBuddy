'use client'
import React, { useEffect, useState } from 'react'
import ExpenseListTable from './_components/ExpenseListTable'
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/dbConfig';
import { desc, eq } from 'drizzle-orm';
import { expenses, categories } from '@/utils/schema';

function expensePage() {

    const { user } = useUser()
    const [expenseList, setExpenseList] = useState([]);

    useEffect(() => {
        // console.log(params)
        user && getAllExpenses();
    }, [user])

    // function to get all the expenses that belong to the user for displaying on homepage
    const getAllExpenses = async () => {
        const result = await db.select({
            id: expenses.id,
            name: expenses.name,
            amount: expenses.amount,
            createdAt: expenses.createdAt
        }).from(categories)
            .rightJoin(expenses, eq(categories.id, expenses.category_id))
            .where(eq(categories.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(expenses.id))

        setExpenseList(result);
        // console.log(result)
    }

    return (
        <div className='p-10'>
            <h2 h2 className='font-bold text-3xl flex items-center justify-between' > My Expenses </h2>
            <ExpenseListTable
                expenseList={expenseList} />

        </div >
    )
}

export default expensePage