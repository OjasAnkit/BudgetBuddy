import React from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartDashboard({ categoryList }) {
    return (
        <div className='border rounded-lg p-5'>
            <h2 className='mb-5 font-bold text-lg'>Summary</h2>
            {/* making the bar chart responsive using responsive container provided by react */}
            <ResponsiveContainer width={'95%'} height={300}>
                <BarChart
                    data={categoryList}
                    margin={{
                        top: 7
                    }}
                >
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip />
                    <Legend></Legend>
                    <Bar dataKey='totalSpent' stackId='a' fill='#007DFC' />
                    <Bar dataKey='amount' stackId='a' fill='#b3d9ff' />
                </BarChart>
            </ResponsiveContainer>
        </div >
    )
}

export default BarChartDashboard