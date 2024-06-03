import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import categories, { expenses } from '@/utils/schema';
import { Loader } from 'lucide-react';
import moment from 'moment/moment';
import React, { useState } from 'react'
import { toast } from 'sonner';

function AddExpense({ categoryName, categoryID, user, refreshData }) {

  const [name, setName] = useState();
  const [expense, setExpense] = useState();
  const [loading, setLoading] = useState(false);

  const addNewExpense = async () => {

    setLoading(true);

    const result = await db.insert(expenses).values({
      name: name,
      amount: expense,
      category_id: categoryID,
      createdAt: moment().format('DD/MM/YYYY')
    }).returning({ insertedId: categories.id })

    // console.log(result)

    if (result) {
      setLoading(true);
      refreshData(); //using to refresh the page as soon as the user successufully adds a new expense
      toast("New Expense Added!💵", {
        description: `You have successfully added an expense to the ${categoryName} category.`,
      });

      setLoading(false);
    }

    // after user has submitted the expense, clear the input boxes of the previous input
    setName('');
    setExpense('');
  }

  return (
    <div className='border p-5 rounded-lg'>
      <h2 className='font-bold text-lg'>Add Expense for Category:</h2>
      <div className="mt-5">
        <h2 className="text-black font-medium my-1">Name</h2>
        <Input
          value={name}
          placeholder="e.g. Rent, Gas Bill"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-5">
        <h2 className="text-black font-medium my-1">Amount</h2>
        <Input
          value={expense}
          placeholder="e.g. 5000"
          type="Number"
          onChange={(e) => setExpense(e.target.value)}
        />
      </div>
      <div>
        <Button disabled={!(name && expense)}
          onClick={() => addNewExpense()}
          className='mt-5 w-full'>
          {/* if loading -> show a loading bar */}
          {loading ? <Loader className='animate-spin' /> : 'Add New Expense'}</Button>
      </div>
    </div>

  )
}

export default AddExpense
