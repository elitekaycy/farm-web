import React, { useEffect, useState } from 'react'

function CompleteOrders() {
    const [orders, setOrders] = useState([])

    useEffect(() => {
          // Fetch a list of farmers from the database
    fetch(`http://localhost:3000/api/orders`)
    .then((response) => response.json())
    .then((data) => {
        console.log("order data ", data)
        setOrders(data)
    });


    }, [])

  return (
    <div className='relative w-full h-full flex flex-row items-start space-x-4 justify-center'>
    <div className='absolute top-2 left-5 text-5xl text-gray-300 font-semibold'>
      Orders
    </div>

    <div className='mt-20 space-y-2'>
        {orders.filter(ord => ord.status === "pending").map(ord => (
            <div key={ord.id} className='space-x-2 flex flex-row items-center'>
                <div className='bg-green-600 text-white p-4 w-full rounded-md' key={ord.id}>
                    <span className='text-xs font-bold'>ordNo: {ord.id}</span>
                {` user ${ord.user.username} successfully purchased ${ord.product.name} `}
              <span className='font-bold text-xs'>
                {ord.createdAt}
              </span>
                </div>
            </div>
        ))}
    </div>


  </div>
  )
}

export default CompleteOrders