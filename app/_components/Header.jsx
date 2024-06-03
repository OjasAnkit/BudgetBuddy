"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RocketIcon } from "@radix-ui/react-icons";
import { SignIn, useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Header() {

  const { isSignedIn, user } = useUser();
  const router = useRouter();

  const goToDashboard = () => {
    router.replace('/dashboard')
  }

  return (
    // by giving a classname we are basically applying a pre defined css property
    <div className='p-5 flex justify-between items-center border shadow-sm'>
      <Image src={'./logo.svg'}
        alt='logo'
        height={100}
        width={160} />
      {
        !isSignedIn ?
          (<Link href={'/sign-in'}>
            <Button>Get Started!</Button>
          </Link>) :
          (<div className='flex justify-center space-x-3 items-center'>
            <Button variant='secondary'
              onClick={goToDashboard}>
              <RocketIcon className="mr-2 h-4 w-4" /> Dashboard
            </Button>
            <UserButton />
          </div>)
      }

    </div>
  )
}
export default Header;