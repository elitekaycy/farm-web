import React, { useEffect, useState } from 'react'

function Orders() {
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
        {orders.map(ord => (
            <div key={ord.id} className='space-x-2 flex flex-row items-center'>
                <div className='bg-white p-4 w-full rounded-md' key={ord.id}>
                    <span className='text-xs font-bold'>ordNo: {ord.id}</span>
                {` user ${ord.user.username} placed order for product ${ord.product.name} `}
                <span className={` cursor-pointer ${ord.status === "pending" ? 'bg-yellow-400 hover:bg-yellow-300' : 'bg-green-400'}  rounded-lg p-1 px-2 text-xs font-bold`}>
                    {`${ord.status} process`}
                </span>
                </div>
            </div>
        ))}
    </div>


  </div>
  )
}

export default Orders