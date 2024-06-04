'use client'
import React, { useEffect, useState } from 'react'
import { UserButton, useUser } from '@clerk/nextjs'
import CardInfo from './_components/CardInfo';
import BarChartDashboard from './_components/BarChartDashboard';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { db } from '@/utils/dbConfig';
import categories, { expenses } from '@/utils/schema';
import CategoryItem from './categories/_components/CategoryItem';
import ExpenseListTable from './expenses/_components/ExpenseListTable';

function Dashboard() {

  const { user } = useUser();
  const [categoryList, setCategoryList] = useState([]); // providing default value of categoryList whilst defining
  const [expenseList, setExpenseList] = useState([]);

  useEffect(() => {
    console.log(user?.fullName)
    user && getCategoryList();
  }, [user])

  const getCategoryList = async () => {
    const result = await db
      .select({
        ...getTableColumns(categories),
        totalSpent: sql`sum(cast(${expenses.amount} as numeric))`.mapWith(Number),
        totalCount: sql`count(${expenses.id})`.mapWith(Number),
      })
      .from(categories)
      .where(eq(categories.createdBy, user?.primaryEmailAddress?.emailAddress))
      .leftJoin(expenses, eq(categories.id, expenses.category_id))
      .groupBy(categories.id)
      .orderBy(desc(categories.id))

    setCategoryList(result);
    getAllExpenses();
  };

  // function to get all the expenses that belong to the user for displaying on homepage
  const getAllExpenses = async () => {
    const result = await db.select({
      id: expenses.id,
      name: expenses.name,
      amount: expenses.amount,
      createdAt: expenses.createdAt,
      category_name: categories.name,
      category_icon: categories.icon
    }).from(categories)
      .rightJoin(expenses, eq(categories.id, expenses.category_id))
      .where(eq(categories.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(expenses.id))

    setExpenseList(result);
    // console.log(result)
  }

  return (
    <div className='p-8'>
      <h2 className='font-bold text-3xl'> Hi, {user?.fullName}✌️</h2>
      <p className='mt-3 text-gray-500'>I am <span className='font-bold'>BudgetBuddy 🤖</span> Let's manage your expenses together!</p>
      <CardInfo
        categoryList={categoryList} />
      <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
        <div className='md:col-span-2'>
          <BarChartDashboard
            categoryList={categoryList}
          />
          <ExpenseListTable
            expenseList={expenseList}
            refreshData={getCategoryList()} />
        </div>
        <div className='grid gap-5'>
          <h2 className='font-bold text-lg'>Categories</h2>
          {/* using the category item element to render category list on homepage */}
          {categoryList.map((category, index) => (
            <CategoryItem
              category={category} />
          ))}
        </div>
      </div>

    </div>
  )
}

export default Dashboard
