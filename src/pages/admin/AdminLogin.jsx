import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import backkey from '../../assets/backkey.png'
import agrolink from '../../assets/agrolink.png'

function AdminLogin() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {

        const getAdmin = localStorage.getItem('FARM_ADMIN') || "false"
        if(getAdmin === "true") navigate('/admin')

    }, [])

    const handleAdminLogin = () => {
        const USERNAME = "admin"
        const PASSWORD = "admin"

        if(username !== USERNAME || password !== PASSWORD) {
            toast.error("invalid username or error")
        }
        else {
            localStorage.setItem('FARM_ADMIN', true)
            navigate('/admin')
            toast.success("admin login successful")
        }
    }

    
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div
      onClick={() =>  navigate(-1)}
      className='absolute top-10 left-10'
      >
        <img alt="back" src={backkey} className='w-12 border-gray-400 hover:border-green-500 cursor-pointer p-4 rounded-full border-1 border' />
      </div>

      <form
      className='bg-white shadow-lg rounded-xl px-8 pt-6 pb-8 mb-4'
      onSubmit={handleAdminLogin}>
        <div className='flex flex-col w-full items-center space-y-3 mb-6'>
            <img src={agrolink} className='w-24' alt="logo" />
             <div className='text-lg tracking-tight font-bold text-center text-gray-500 mb-1'>Admin</div>
        </div>

        <div className='mb-4'>
            <input
             type='text'
             name='username'
             value={username}
             onChange={(e) => setUsername(e.target.value)}
             className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-500'
            placeholder='username'
           />
           </div>
           <div className='mb-6'>
           <input
           type='password'
           name='password'
           value={password}
           placeholder='password'
           onChange={(e) => setPassword(e.target.value)}
           className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-500'
           />
        </div>

        <div>
          <button 
          type='submit'
          className='bg-green-500 hover:bg-green-700 w-full text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Sign in
          </button>
        </div>

      </form>
    </div>
  )
}

export default AdminLogin