"use client";
import React, { useState } from "react";
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
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import categories from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

function CreateCategory({ refreshData }) {
  /* useState returns an array with two elements: the current value of the state and a function to update that value. For the emoji icon state, the emojiIcon represents the current value of the state (current value of emoji icon), and the setEmojiIcon is basically a function that we can use to change the current state (basically the current value of EmojiIcon) */

  const [emojiIcon, setEmojiIcon] = useState("💸"); /*setting the default emoji icon*/

  const [openEmojiDialogue, setOpenEmojiDialogue] = useState(false); /*setting the default state for the emoji picker*/

  const [amount, setAmount] = useState();
  const [name, setName] = useState();

  const { user } = useUser();
  const onCreateCategory = async () => {
    // async await asynch js
    const result = await db
      .insert(categories)
      .values({
        name: name,
        amount: amount,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        icon: emojiIcon,
      })
      .returning({ insertedId: categories.id }); // once the data is inserted into the table, we are simply returning the id of the user (We can return anything we want)

    if (result) {
      refreshData(); //using to refresh the page as soon as the user successufully creates a new category
      toast("New Category Created!💸", {
        description: `You have successfully created the ${name} category.`,
      });
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          {/*  By using asChild, we ensure that the formatting and structure applied to the div inside DialogTrigger remain unchanged, and no additional formatting or wrapping elements are added by DialogTrigger. */}
          <div className="bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md">
            <h2 className="text-3xl">+</h2>
            <h2>Create New Category</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Category</DialogTitle>
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
                  placeholder="e.g. Rent, Shopping, Groceries.. :)"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mt-5">
                <h2 className="text-black font-medium my-1">Amount</h2>
                <Input
                  placeholder="e.g. 5000"
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
                onClick={() => onCreateCategory()}
              >
                Create Category
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateCategory;
