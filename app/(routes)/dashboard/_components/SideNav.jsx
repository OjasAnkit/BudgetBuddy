'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LayoutGrid, PiggyBank, Banknote, BadgeInfo } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { usePathname, useRouter } from 'next/navigation'
import { Linden_Hill } from 'next/font/google'

function SideNav() {
    const router = useRouter();
    const onLogoClick = () => {
        router.replace('/');
    };

    const menuList = [
        {
            id: 1,
            name: 'Dashboard',
            icon: LayoutGrid,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Categories',
            icon: PiggyBank,
            path: '/dashboard/categories'
        },
        {
            id: 3,
            name: 'Expenses',
            icon: Banknote,
            path: '/dashboard/expenses'
        },
        {
            id: 4,
            name: 'About',
            icon: BadgeInfo,
            path: '/dashboard/about'
        }
    ]
    const path = usePathname();
    // console.log(path)
    return (
        <div className='h-screen p-5 border shadow-sm'>
            <Image src={'/logo.svg'}
                alt='logo'
                width={160}
                height={100}
                className='cursor-pointer'
                onClick={() => onLogoClick()}
            />
            <div className='mt-5'>
                {menuList.map((menu, index) => (
                    <Link href={menu.path}>
                        <h2 className={`flex gap-2 items-center text-gray-500 font-medium p-5 rounded-md
                    mb-2
                    cursor-pointer hover:text-primary hover:bg-blue-100
                    ${path == menu.path && 'text-primary bg-blue-100'}`}>
                            <menu.icon></menu.icon>
                            {menu.name}
                        </h2>
                    </Link>
                ))}
            </div>
            <div className='fixed bottom-10 p-5 gap-2 flex items-center scale-125'>
                <UserButton />
                <div className='text-gray-600'>Profile</div>
            </div>
        </div>
    )
}

export default SideNav