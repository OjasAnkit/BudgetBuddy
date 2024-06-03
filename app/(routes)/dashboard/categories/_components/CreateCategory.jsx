"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { db } from '@/utils/dbConfig'
import categories from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'

function CreateCategory() {

    const [emojiIcon, setEmojiIcon] = useState('💸'); {/*setting the default emoji icon*/}
    const [openEmojiDialogue, setOpenEmojiDialogue] = useState(false); {/*setting the default state for the emoji picker*/}
    const [amount, setAmount] = useState();
    const [name, setName] = useState();

    const {user} = useUser();
    const onCreateBudget=async()=>{
        const result = await db.insert(categories).values({
            name: name,
            amount: amount,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            icon:emojiIcon
        }).returning({insertedId:categories.id}) // once the data is inserted into the table, we are simply returning the id of the user (We can return anything we want)

        if(result)
        {
            toast('New Category Created!💸',{
                description: `You have successfully created the ${name} category.`
            })
        }
    }

  return (
    <div>
        <Dialog>
            <DialogTrigger asChild> 
            {/*  By using asChild, we ensure that the formatting and structure applied to the div inside DialogTrigger remain unchanged, and no additional formatting or wrapping elements are added by DialogTrigger. */}
            <div className='bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md'>
                <h2 className='text-3xl'>+</h2>
                <h2>Create New Category</h2>
            </div>
            </DialogTrigger>
            <DialogContent>
            <DialogHeader>
            <DialogTitle>Create New Category</DialogTitle>
            <DialogDescription>
                <div className='mt-5'>
                    <Button variant="outline"
                    className="text-xl"
                    onClick={()=>setOpenEmojiDialogue(!openEmojiDialogue)}>{emojiIcon}</Button> {/*using the default emoji icon*/}
                    <div className='absolute'>
                        <EmojiPicker
                        open={openEmojiDialogue}
                        onEmojiClick={(e)=>{
                            setEmojiIcon(e.emoji);
                            setOpenEmojiDialogue(false);
                        }}
                        />
                    </div>
                </div>

                <div className='mt-5'>
                    <h2 className='text-black font-medium my-1'>
                        Name
                    </h2>
                    <Input placeholder="e.g. Rent, Shopping, Groceries.. :)"
                    onChange={(e)=>setName(e.target.value)}/>
                </div>
                
                <div className='mt-5'>
                    <h2 className='text-black font-medium my-1'>
                        Amount
                    </h2>
                    <Input placeholder="e.g. 5000"
                    type="Number"
                    onChange={(e)=>setAmount(e.target.value)}/>
                </div>
                
            </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                    <Button className="mt-7 w-full"
                    disabled = {!(name&&amount)}
                    onClick={()=>onCreateBudget()}
                    >Create Category</Button>
                </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    </div>
  )
}

export default CreateCategory