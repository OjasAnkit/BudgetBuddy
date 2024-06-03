import React from 'react'
import CreateCategory from './CreateCategory'

function CategoryList() {
  return (
    <div className='mt-7'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            <CreateCategory/>
        </div>
    </div>
  )
}

export default CategoryList