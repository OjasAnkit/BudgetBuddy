import { db } from '@/utils/dbConfig'
import { expenses } from '@/utils/schema'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from 'emoji-picker-react';
import { eq } from 'drizzle-orm'
import { PenBox, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button';
import { Input } from 'postcss';

export default function ExpenseListTable({ expenseList, refreshData }) {

    const [expense, setExpense] = useState();
    const [expenseName, setExpenseName] = useState();
    const [expenseAmount, setExpenseAmount] = useState();

    useEffect(() => {
        setExpenseName()
        setExpenseAmount()
    }, [expenseList])

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

    const editExpense = async (expense) => {
        console.log(expense, expenseAmount, expenseName)
        // const result = await db.delete(expenses)
        //     .where(eq(expenses.id, expense.id))
        //     .returning();

        // if (result) {
        //     refreshData(); //using to refresh the expense table after deleting expense
        //     toast(`Expense Edited!✏️`, {
        //         description: `You have successfully edited '${expense.name}' expense.`,
        //     });
        // }
    }

    return (
        <div className='mt-3'>
            <h2 className='font-bold text-lg mb-3 mt-5'>Latest Expenses</h2>
            <div className='grid grid-cols-5 bg-blue-50 p-2 font-bold'>
                <h2>Expense Name</h2>
                <h2>Category</h2>
                <h2>Amount</h2>
                <h2>Created At</h2>
                <h2>Action</h2>
            </div>
            {expenseList?.map((expenses, index) => (
                <div className='grid grid-cols-5 bg-slate-50 p-2'>
                    <h2>{expenses.name}</h2>
                    <h2 className=''>{expenses.category_name}{expenses.category_icon}</h2>
                    <h2>&#x20b9;{Number(expenses?.amount).toLocaleString("en-IN")}</h2>
                    <h2>{expenses.createdAt}</h2>
                    <h2 className=' items-center flex justify-start gap-3'>
                        {/* // on clicking the delete button, calling the delete expense function, and passing the expense to be deleted */}
                        <div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <PenBox className='cursor-pointer text-primary' onClick={() => setExpense(expenses)}></PenBox>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Update Expense</DialogTitle>
                                        <DialogDescription>
                                            <div className="mt-5">
                                                <Button
                                                    variant="outline"
                                                    className="text-xl"
                                                >
                                                    {expenses.category_icon}
                                                </Button>{" "}
                                                {/*using the emoji icon of the expense*/}
                                            </div>

                                            <div className="mt-5">
                                                <h2 className="text-black font-medium my-1">Name</h2>
                                                <Input
                                                    defaultValue={expenses.name}
                                                    onChange={(e) => setExpenseName(e.target.value)}
                                                />
                                            </div>

                                            <div className="mt-5">
                                                <h2 className="text-black font-medium my-1">Amount</h2>
                                                <Input
                                                    defaultValue={expenses.amount}
                                                    type="Number"
                                                    onChange={(e) => setExpenseAmount(e.target.value)}
                                                />
                                            </div>
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter className="sm:justify-start">
                                        <DialogClose asChild>
                                            <Button
                                                className="mt-7 w-full"
                                                disabled={!(expenseName && expenseAmount)}
                                                onClick={() => editExpense()}
                                            >
                                                Update Expense
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <Trash className='cursor-pointer text-red-600' onClick={() => deleteExpense(expenses)}></Trash>
                    </h2>

                </div>
            ))}
        </div>
    )
}
