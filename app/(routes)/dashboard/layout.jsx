"use client"
import React, { useEffect } from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from './_components/DashboardHeader'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/dbConfig'
import { eq } from 'drizzle-orm'
import { categories } from '@/utils/schema' // we use {} to import specific named exports from a module, if we don't use {} we will import the default export. If no default export is defined this won't work
import { useRouter } from 'next/navigation'

function DashboardLayout({children}) {

  const {user} = useUser(); // we are getting the user object here and checking if the user has any budget categories created or not, if yes -> redirect him to the dashboard, if no -> redirect him to the categories page

  const router = useRouter();

  useEffect(()=>{
    user&&checkIfUserHasCategories();
    // console.log(user?.primaryEmailAddress?.emailAddress);
  },[user]);

  const checkIfUserHasCategories=async()=>{
    const result = await db.select()
    .from(categories)
    .where(eq(categories.createdBy, user?.primaryEmailAddress?.emailAddress))

    /* ?. is called the optional chaining operator. It allows you to access properties of an object that may be undefined or null without causing an error. If the property before the ?. is undefined or null, the expression will short-circuit, and the entire expression will evaluate to undefined. This prevents a TypeError from being thrown if any part of the chain is null or undefined. */

    /* . is the standard property accessor in JavaScript. If you use . to access a property of an object that is null or undefined, it will throw a TypeError. */  

    // console.log(result.length);
    if(result.length==0)
    {
      console.log('No categories found. Redirecting user to categories page.')
      router.replace('/dashboard/categories');
    }
  }

  return (
    <div>
    <div className='fixed md:w-64 hidden md:block'>
      <SideNav/>
      </div>
      <div className='md:ml-64'>
      <DashboardHeader/>
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout