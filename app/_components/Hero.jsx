import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { useUser } from '@clerk/nextjs'

const {isUserSignedin, user} = useUser;
function Hero() {
  return (
        <section className="bg-gray-50 flex items-center flex-col">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex">
                <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-2xl font-extrabold sm:text-5xl">
                    Budgeting Made Effortless💸 
                    <strong className="font-extrabold text-primary sm:block"> Using BudgetBuddy! </strong>
                </h1>

                <p className="mt-4 sm:text-xl/relaxed">
                    Take charge of your finances with BudgetBuddy, your ultimate money-saving sidekick!
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <div className="block w-full rounded bg-primary px-12 py-3 text-md font-large text-white shadow hover:bg-blue-500 focus:outline-none focus:ring active:bg-blue sm:w-auto" 
                    >
                    {
                        !isUserSignedin ? <Link href='/sign-in'>Get Started</Link> : 
                        <Link href='/dashboard'>Get Started</Link>
                    }
                    </div>
                </div>
                </div>
            </div>
            <Image src={'/dashboard.png'} 
            alt='dashboard-placeholder'
            height={400}
            width={800}
            className='-mt-12 rounded-xl border-2'
            />
        </section>

  )
}

export default Hero