import { BadgeIndianRupee, HandCoins, IndianRupee, Landmark, List, PiggyBank, ReceiptIndianRupee, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function CardInfo({ categoryList }) {

    const [totalBudget, setTotalBudget] = useState();
    const [totalCategories, setTotalCategories] = useState();
    const [totalExpenses, setTotalExpenses] = useState();

    useEffect(() => {
        categoryList && calculateCardInfo(); // used to run the calculate card fn only when we have data present for category list
    }, [categoryList])

    const calculateCardInfo = () => {
        // console.log(categoryList)

        let calcBudget = 0;
        let calcExpenses = 0;
        let calcCategories = categoryList?.length;

        categoryList.forEach(element => {
            calcBudget += Number(element.amount);
            calcExpenses += Number(element.totalSpent);
        });

        setTotalBudget(calcBudget);
        setTotalExpenses(calcExpenses);
        setTotalCategories(calcCategories);
    }

    return (
        <div>
            {
                categoryList?.length > 0 ?        //adding loading skeleton effect. If category list loaded -> show the cards otherwise skeleton effect
                    <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                        <div className='p-7 border rounded-lg flex items-center justify-between'>
                            <div>
                                <h2 className='text-sm'>Total Budget</h2>
                                <h2 className='font-bold text-2xl'>&#x20b9;{Number(totalBudget).toLocaleString("en-IN")}</h2>
                            </div>
                            <Landmark
                                className='bg-primary p-3 h-12 w-12 rounded-full text-white'></Landmark>
                        </div>
                        <div className='p-7 border rounded-lg flex items-center justify-between'>
                            <div>
                                <h2 className='text-sm'>Total Expenses</h2>
                                <h2 className='font-bold text-2xl'>&#x20b9;{Number(totalExpenses).toLocaleString("en-IN")}</h2>
                            </div>
                            <ReceiptIndianRupee
                                className='bg-primary p-3 h-12 w-12 rounded-full text-white'></ReceiptIndianRupee>
                        </div>
                        <div className='p-7 border rounded-lg flex items-center justify-between'>
                            <div>
                                <h2 className='text-sm'>Total Categories</h2>
                                <h2 className='font-bold text-2xl'>{Number(totalCategories).toLocaleString("en-IN")}</h2>
                            </div>
                            <List
                                className='bg-primary p-3 h-12 w-12 rounded-full text-white'></List>
                        </div>
                    </div>
                    :
                    <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>{
                        [1, 2, 3].map((items, index) => (
                            <div key={index} className="w-full bg-slate-200 rounded-lg h-[120px] animate-pulse"> {/*adding loading animation for category lists*/}
                            </div>
                        ))
                    }
                    </div>

            }
        </div>
    )
}

export default CardInfo