import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import categories, { expenses } from '@/utils/schema';
import { eq, getTableColumns } from 'drizzle-orm';
import React, { useState } from 'react'
import { toast } from 'sonner';

function AddExpense({ categoryID, user, refreshData }) {

  const [name, setName] = useState();
  const [categoryName, setCategoryName] = useState();
  const [expense, setExpense] = useState();


  const getCategoryName = async () => {
    const result = await db
      .select({
        ...getTableColumns(categories)
      })
      .from(categories)
      .where(eq(categories.id, categoryID))
    // getting the category name to be used in the toast message

    console.log(result[0].name)
    setCategoryName(result[0].name);
  }

  const addNewExpense = async () => {
    const result = await db.insert(expenses).values({
      name: name,
      amount: expense,
      category_id: categoryID,
      createdAt: user?.primaryEmailAddress?.emailAddress
    }).returning({ insertedId: categories.id })

    console.log(result)

    if (result) {
      refreshData(); //using to refresh the page as soon as the user successufully adds a new expense
      getCategoryName(); //fetching category name
      toast("New Expense Added!💵", {
        description: `You have successfully added an expense to the ${categoryName} category.`,
      });
    }
  }

  return (
    <div className='border p-5 rounded-lg'>
      <h2 className='font-bold text-lg'>Add Expense for Category:</h2>
      <div className="mt-5">
        <h2 className="text-black font-medium my-1">Name</h2>
        <Input
          placeholder="e.g. Rent, Gas Bill"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-5">
        <h2 className="text-black font-medium my-1">Amount</h2>
        <Input
          placeholder="e.g. 5000"
          type="Number"
          onChange={(e) => setExpense(e.target.value)}
        />
      </div>
      <div>
        <Button disabled={!(name && expense)}
          onClick={() => addNewExpense()}
          className='mt-5 w-full'>Add New Expense</Button>
      </div>
    </div>

  )
}

export default AddExpense
