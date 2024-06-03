import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import categories, { expenses } from '@/utils/schema';
import React, { useState } from 'react'
import { toast } from 'sonner';

function AddExpense({ categoryName, categoryID, user, refreshData }) {

  const [name, setName] = useState();
  const [expense, setExpense] = useState();

  const addNewExpense = async () => {
    console.log('Hello')
    const result = await db.insert(expenses).values({
      name: name,
      amount: expense,
      category_id: categoryID,
      createdAt: user?.primaryEmailAddress?.emailAddress
    }).returning({ insertedId: categories.id })

    console.log(result)

    if (result) {
      refreshData(); //using to refresh the page as soon as the user successufully adds a new expense
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
          onClickEvent={() => addNewExpense()}
          className='mt-5 w-full'>Add New Expense</Button>
      </div>
    </div>

  )
}

export default AddExpense
