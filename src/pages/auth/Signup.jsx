import React, { useState } from 'react';
import toast from 'react-hot-toast';
import agrolink from '../../assets/agrolink.png'
import { useNavigate } from 'react-router-dom';
import backkey from '../../assets/backkey.png'

const Signup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data to sumbimt ", formData)
    try {
      const response = await fetch('http://localhost:3000/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("create user data ", data);
        
        // Handle the response from the server
        localStorage.setItem('FARM_USER', JSON.stringify(data))
        toast.success("successfully created user")
        navigate('/categories', { replace: true })
      } else {
        console.error('Failed to submit data');
        toast.error("Failed to create error")
      }
    } catch (error) {
      console.error(error);
      toast.error(error)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div 
      onClick={() => navigate(-1)}
      className='absolute top-10 left-10'>
        <img alt="back" src={backkey} className='w-12 border-gray-400 hover:border-green-500 cursor-pointer p-4 rounded-full border-1 border' />
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl px-8 pt-6 pb-8 mb-4">
        <div className='flex flex-col w-full items-center space-y-3 mb-6'>
          <img src={agrolink} className='w-24' alt="logo"/>
          <div>
          <div className='text-lg tracking-tight font-bold text-center text-gray-500 mb-1'>Sign Up</div>
          <div className='text-center text-gray-400 text-xs font-normal'>lets get you started</div>
          </div>
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="username"
            value={formData?.username}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-500"
            placeholder="Username"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-500"
            placeholder="Email"
          />
        </div>
        <div className="mb-6">
  
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-500"
            placeholder="Password"
          />
        </div>
        <div className="flex items-center w-full justify-between">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 w-full text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Sign Up
          </button>
        </div>

        <div className='text-sm text-center text-gray-400 mt-2'>
          already a user? <a href='/login' className='hover:underline text-green-500 cursor-pointer'>Log in</a>
        </div>
      </form>
    </div>
  );
};

export default Signup;

