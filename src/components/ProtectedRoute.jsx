import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
    const navigate = useNavigate()

    useEffect(() => {
        const getUser = localStorage.getItem("FARM_USER") || null 
        console.log("get user from protected route is ", getUser, window.location.pathname, typeof window.location.pathname)

        if(getUser && ['/login', '/signup'].includes(String(window.location.pathname))) navigate("/categories", { replace: true})
        if(!getUser && !['/login', '/signup'].includes(String(window.location.pathname))) navigate('/login') 

    }, [])


  return (
    <div>
     { children }
    </div>
  )
}

export default ProtectedRoute