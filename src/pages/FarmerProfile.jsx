import { useEffect, useState } from "react";
import React from "react";
import Header from "../components/Header";
import location from '../assets/location.png'

function FarmerProfile() {
    const [farmers, setFarmers] = useState()
    const colors = [`bg-green-100`, 'bg-blue-100', 'bg-red-100']

    useEffect(() => {

        fetch(`http://localhost:3000/api/farmers`)
        .then((response) => response.json())
        .then((data) => {
          console.log("farmers are ", data)
          setFarmers(data)})

    }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="p-4 flex flex-row gap-4 flex-wrap mx-auto items-center justify-center">

        {farmers && farmers.map((f, idx) => (

        <div key={f?.id} className={`${colors[Math.random() * colors.length]} p-6 items-center justify-between w-96 h-96 flex flex-col bg-white rounded-lg`}>
          <div className="space-y-2">
          <div className="font-semibold text-2xl text-center tracking-tight">{f?.username}</div>
          <div className="flex flex-row items-center justify-center text-xs text-gray-400 text-center">
            {f?.email}
          </div>
          <div className="flex flex-row items-center justify-center text-xs text-gray-400 text-center">
            <span className="w-6 p-1"><img src={location} alt="location.." className="w-full h-full"/></span>
            <div className="text-center">{f?.location}</div>
          </div>

          <div className="flex flex-row items-center justify-center text-xs text-gray-400 text-center">
            <a href={f?.gps} className="hover:underline cursor-pointer text-green-200"> {f?.gps} </a>
          </div>


          </div>

          <div className="p-2 text-center text-sm text-gray-400 mt-5 max-w-sm">
            {f?.bio || "no bio..."}
          </div>


          <div className="font-bold text-lg tracking-tight">
            {f?.phoneNumber}
          </div>
        </div>
        ))}


      </div>
     
    </div>
  );
}

export default FarmerProfile;
