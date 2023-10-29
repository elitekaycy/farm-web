import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import AdminUsers from './AdminUsers'
import AdminHome from './AdminHome'
import FarmerPage from '../Farmer'
import TypePage from '../Type'
import ProductPage from '../Product'
import Orders from '../Orders'
import CompletOrders from '../CompleteOrders'

function Admin() {
  const [activeNav, setActiveNav] = useState("Users")
  const navigate = useNavigate()

  useEffect(() => {
    const getAdminUser = localStorage.getItem('FARM_ADMIN')
    if(getAdminUser === 'false' || !getAdminUser) navigate('/login/admin')

  }, [])

  const ordersNreports =  [
    {
      name: "View Orders",
      link: "/admin/orders"
    },
    {
      name: "View Complete Orders",
      link: "/admin/orders/complete"
    },
    {
      name: "View Purchase Reports",
      link: "/admin/purchase/reports"
    },
    {
      name: "View User Reports",
      link: "/admin/reports/user"
    },
  ]


  const adminNav = [
    {
      name: "Users",
      link: "/admin/users"
    },
    {
      name: "Add Products",
      link: "/admin/product"
    },
    {
      name: "Add Farmers",
      link: "/admin/farmer"
    },
    {
      name: "Add Product Type",
      link: "/admin/type"
    },
  ]

  return (
    <div className='w-screen h-full min-h-screen flex flex-row bg-gray-100'>
      <div className='h-full min-h-screen flex flex-col justify-between max-w-xs w-full bg-green-600 p-4'>

        <div>
        <div className='text-white font-bold text-lg text-center tracking-tight p-4'>
          Admin Panel
        </div>

        <div className='flex flex-col space-y-2'>
          <div className='text-gray-200 text-xs p-2'>Routes</div>
          {adminNav && adminNav.map(nav =>  (
            <button 
            onClick={() => {
              setActiveNav(nav.name)
              navigate(nav.link)
            }}
            className={`${activeNav === nav.name ? 'bg-white font-bold' : 'hover:bg-green-500 text-white'} p-2 rounded-lg text-left font-semibold text-sm`} key={nav?.name}>
              {nav?.name}
            </button>
          ))}
        </div>

        <div className='flex flex-col space-y-2 mt-10'>
          <div className='text-gray-200 text-xs p-2'>Orders & Reports</div>
          {ordersNreports && ordersNreports.map(nav =>  (
            <button 
            onClick={() => {
              setActiveNav(nav.name)
              navigate(nav.link)
            }}
            className={`${activeNav === nav.name ? 'bg-white font-bold' : 'hover:bg-green-500 text-white'} p-2 rounded-lg text-left font-semibold text-sm`} key={nav?.name}>
              {nav?.name}
            </button>
          ))}
        </div>
        </div>

       <button 
       onClick={() => {
        localStorage.removeItem('FARM_ADMIN')
        navigate('/login/admin')}}
       className='text-center text-white p-2 hover:bg-white hover:text-black px-3 bg-green-500 rounded-lg'>
        logout
       </button>
      </div>

      <div className='w-full flex flex-1 p-4'>
       <Routes>
         <Route path='/' element={<AdminHome />} exact/>
         <Route path='/users' element={<AdminUsers />} exact/>
         <Route path='/farmer' element={<FarmerPage />} exact/>
         <Route path='/type' element={<TypePage />} exact/>
        <Route path='/product' element={<ProductPage />} exact/>
        <Route path="/orders" element={<Orders />} exact />
        <Route path="/orders/complete" element={<CompletOrders />} exact />
       </Routes>
      </div>

    </div>
  )
}

export default Admin