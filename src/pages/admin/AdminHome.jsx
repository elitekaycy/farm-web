import React, { useEffect, useState } from 'react'

function AdminHome() {

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [farmers, setFarmers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch users data
    fetch('http://localhost:3000/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));

    // Fetch products data
    fetch('http://localhost:3000/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));

    // Fetch farmers data
    fetch('http://localhost:3000/api/farmers')
      .then((response) => response.json())
      .then((data) => setFarmers(data))
      .catch((error) => console.error('Error fetching farmers:', error));

    // Fetch orders data
    fetch('http://localhost:3000/api/orders')
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error('Error fetching orders:', error));
  }, []);


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
               <Card name={"users"} len={users.length} />
                <Card name={"products"} len={products.length}/>
            </div>
            <div className='space-y-4'>
               <Card name={"farmers"} len={farmers.length} />
                <Card name={"orders"} len={orders.length}/>
            </div>
    
    
        </div>
      )
}

export default AdminHome