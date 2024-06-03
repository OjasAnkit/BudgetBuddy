"use client";
import React, { useEffect, useState } from "react";
import CreateCategory from "./CreateCategory";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { categories, expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import CategoryItem from "./CategoryItem";
import { index } from "drizzle-orm/mysql-core";

function CategoryList() {
  const [categoryList, setCategoryList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && getCategoryList();
  }, [user]); // only get the category list if we have the user info present with us

  // flow to get the category list as well as the total amount and count of all the expenses in that particular category
  const getCategoryList = async () => {
    const result = await db
      .select({
        ...getTableColumns(categories),
        totalSpent: sql`sum(cast(${expenses.amount} as numeric))`.mapWith(Number), // getting the total amount spent by the user
        totalCount: sql`count(${expenses.id})`.mapWith(Number), // getting the total count of items in the category
      })
      .from(categories)
      .where(eq(categories.createdBy, user?.primaryEmailAddress?.emailAddress)) // applying this filter to only get the category list for the currently signed in user
      .leftJoin(expenses, eq(categories.id, expenses.category_id)) // category c left join expense e on c.id = e.category_id
      .groupBy(categories.id) // group by since we are using aggregate functions
      .orderBy(desc(categories.id)) // ordering by category amount
    // console.log(result);
    setCategoryList(result);
  };

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateCategory 
        refreshData={()=>getCategoryList()}/> {/*added to refresh category list as soon as a new category is created*/}
        {categoryList.length>0?categoryList.map((category, index) => (
          <CategoryItem category = {category}/> // This code iterates over each element in the categoryList, renders the CategoryItem component for each category item in the list, and returns an array of these rendered components. Sending each category to the category item function
        )):[1,2,3,4,5,6].map((items,index)=>(
          <div key={index} className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"> {/*adding loading animation for category lists*/}
          </div>
        ))
        }
      </div>
    </div>
  );
}

export default CategoryList;
