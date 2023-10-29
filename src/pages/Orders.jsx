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

    const processOrder = (ord) => {
        console.log("order => ", ord)
    }

  return (
    <div className='relative w-full h-full flex flex-row items-start space-x-4 justify-center'>
    <div className='absolute top-2 left-5 text-5xl text-gray-300 font-semibold'>
      Orders
    </div>

    <div className='mt-20 space-y-6 w-full'>
        {orders.map(ord => (
            // <div key={ord.id} className='space-x-2 flex flex-row items-center'>
            //     <div className='bg-white p-4 w-full rounded-md'>
            //         <span className='text-xs font-bold'>ordNo: {ord.id}</span>
            //     {` user ${ord.user.username} placed order for product ${ord.product.name} `}
            //     <span className={` cursor-pointer ${ord.status === "pending" ? 'bg-yellow-400 hover:bg-yellow-300' : 'bg-green-400'}  rounded-lg p-1 px-2 text-xs font-bold`}>
            //         {`${ord.status} process`}
            //     </span>
            //     </div>
            // </div>
            <div key={ord.id} className='space-y-3'>
                <div className='text-xs tracking-wide'><span className='font-bold'>{ord.user.username}</span> placed an order for  <span className='font-bold'>{ord.product.name}</span></div>
                <div className='w-full space-y-2 bg-white rounded-md p-4 flex flex-col'>
                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-row items-center space-x-1'>
                            <span className='font-semibold text-lg text-gray-400'>#{ord.id}</span> - 
                            <span className='font-semibold text-lg'>{ord.product.name}</span>
                            <span className={` cursor-pointer ${ord.status === "pending" ? 'bg-yellow-400 hover:bg-yellow-300' : 'bg-green-400'}  rounded-lg p-1 px-2 text-xs font-bold`}>
                   {`${ord.status} process`}</span>
                        </div>

                        <button 
                        onClick={() => processOrder(ord)}
                        className='p-1 text-xs font-semibold px-4 rounded-md bg-green-500 text-white hover:bg-green-400 cursor-pointer'>
                            process order
                        </button>
                    </div>

                    <div className='flex text-xs space-x-3 text-gray-400 flex-row items-center'>
                        <span>location: {ord.product.location}</span>
                        <span>price: {ord.product.price}</span>
                        <span>user email: {ord.user.email}</span>
                        
                        

                    </div>

                </div>
            </div>
        ))}
    </div>


  </div>
  )
}

export default Orders