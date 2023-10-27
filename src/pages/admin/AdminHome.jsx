import React, { useEffect } from 'react'

function AdminHome({ usersLength, productLength, ordersLength, recieptLength }) {
    const Card = ({ name , len }) => {
        return (
          <div className='w-48 h-32 flex space-y-3 flex-col items-center justify-center bg-white shadow-sm p-4'>
            <div className='text-5xl'>{len || '0'}</div>
            <div className='text-lg font-semibold'>{name || 'anonymous' }</div>
          </div>
        )
      }
    
      return (
        <div className='relative w-full h-full flex flex-row items-center space-x-4 justify-center'>
          <div className='absolute top-2 left-5 text-5xl text-gray-300 font-semibold'>
            Overview
          </div>
            <div className='space-y-4'>
               <Card name={"users"} len={15} />
                <Card />
            </div>
            <div className='space-y-4'>
               <Card />
                <Card />
            </div>
    
    
        </div>
      )
}

export default AdminHome