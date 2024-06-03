'use client'
import { Button } from '@/components/ui/button'
import { PenBox } from 'lucide-react'
import React, { useEffect, useState } from 'react'

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
import { Input } from "@/components/ui/input";
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/dbConfig';
import categories from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';

function EditCategory({ categoryInfo, refreshData }) {

    const [emojiIcon, setEmojiIcon] = useState(); /*setting the default emoji icon*/

    const [openEmojiDialogue, setOpenEmojiDialogue] = useState(false); /*setting the default state for the emoji picker*/

    const [amount, setAmount] = useState();
    const [name, setName] = useState();

    const { user } = useUser();

    useEffect(() => {
        setEmojiIcon(categoryInfo?.icon)
        setAmount(categoryInfo?.amount)
        setName(categoryInfo?.name)
    }, [categoryInfo])

    const onUpdateCategory = async () => {
        const result = await db.update(categories).set({
            name: name,
            amount: amount,
            icon: emojiIcon,
        }).where(eq(categoryInfo.id, categories.id))
            .returning();

        if (result) {
            refreshData(); //using to refresh the page as soon as the user updates a category
            toast("Category Updated!💸", {
                description: `You have successfully updated the ${name} category.`,
            });
        }
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    {/*  By using asChild, we ensure that the formatting and structure applied to the div inside DialogTrigger remain unchanged, and no additional formatting or wrapping elements are added by DialogTrigger. */}
                    <Button size="icon" className='shadow-md text-3xl'>
                        <PenBox className="h-4 w-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Category</DialogTitle>
                        <DialogDescription>
                            <div className="mt-5">
                                <Button
                                    variant="outline"
                                    className="text-xl"
                                    onClick={() => setOpenEmojiDialogue(!openEmojiDialogue)}
                                >
                                    {emojiIcon}
                                </Button>{" "}
                                {/*using the default emoji icon*/}
                                <div className="absolute z-10"> {/*making z index higher for the emoji picker so that it is above the create category button*/}
                                    <EmojiPicker
                                        open={openEmojiDialogue}
                                        onEmojiClick={(e) => {
                                            setEmojiIcon(e.emoji);
                                            setOpenEmojiDialogue(false);
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="mt-5">
                                <h2 className="text-black font-medium my-1">Name</h2>
                                <Input
                                    // placeholder="e.g. Rent, Shopping, Groceries.. :)"
                                    defaultValue={categoryInfo?.name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="mt-5">
                                <h2 className="text-black font-medium my-1">Amount</h2>
                                <Input
                                    // placeholder="e.g. 5000"
                                    defaultValue={categoryInfo?.amount}
                                    type="Number"
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button
                                className="mt-7 w-full"
                                disabled={!(name && amount)}
                                onClick={() => onUpdateCategory()}
                            >
                                Update Category
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditCategory