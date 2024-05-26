import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function Header() {
  return (
    // by giving a classname we are basically applying a pre defined css property called p-5
    <div className='p-5 flex justify-between items-center border shadow-sm'> 
      <Image src={'./logo.svg'} 
      alt='logo'
      height={100} 
      width={160} />
      
      <Button>Get Started!</Button>
    </div>
  )
}

export default Header;