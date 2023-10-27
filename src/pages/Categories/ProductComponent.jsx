import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProductComponent({ product }) {
  const { id, image, location, name, price, quantity, farmerId, typeId} = product;
  const navigate = useNavigate()


  return (
    <div
    onClick={() => navigate(`/product/${typeId}/${farmerId}/${id}`, { replace: true})}
    className="w-60 h-80 flex-col items-center flex justify-between bg-white rounded-xl hover:scale-105 transition ease-in-out duration-200 transform scale-100 cursor-pointer">
      <div className="flex-1">
        <div className="w-60 bg-orange-50 rounded-t-xl h-48 flex items-center justify-center">
        <img alt="service1" src={image} className="w-full" />
        </div>

        <div className="p-3 space-y-1">

        <div className="flex flex-row items-center justify-between">
          <div className="font-semibold tracking-tight text-lg">{name}</div>
          <div className="tracking-tight font-bold text-green-500">{price}</div>
        </div>

        <div className="text-gray-400 text-xs">
          {location}
        </div>

        <div className="font-bold text-xl tracking-tight">
          {quantity} pieces
        </div>
        </div>

        
      </div>

      {/* <div 
      onClick={() => navigate(`/product/${typeId}/${farmerId}/${id}`, { replace: true})}
      className="w-full cursor-pointer p-2 rounded-full text-center font-semibold text-white bg-green-500">
        view product
      </div> */}
    {/* <div
      className="flex flex-col items-center"
    >
      <div className="w-full">
        <img alt="service1" src={image} className="w-full rounded-sm" />
      </div>
      <div className="w-full flex flex-row items-center justify-between p-2">
        <div>
        <div className="font-bold text-sm">{name}</div>
        <div className="font-semibold text-xs">{location}</div>
        </div>
        <div className="">
          <div className="text-sm w-full font-bold text-gray-600">price: {price}</div>
          <div className="text-xs font-bold">quantity: {quantity}</div>
        </div>
      </div>

      <div 
      onClick={() => navigate(`/product/${typeId}/${farmerId}/${id}`, { replace: true})}
      className="w-full cursor-pointer p-2 rounded-sm text-center font-semibold text-white bg-green-500">
        view product
      </div>
    </div> */}
    </div>
  );
}

export default ProductComponent;
