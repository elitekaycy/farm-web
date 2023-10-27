import React, { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import backkey from '../assets/backkey.png';
import del from '../assets/delete.png'
import toast from "react-hot-toast";

function Cart() {
    const navigate = useNavigate()
    const [cartItem, setCartItems] = useState([])
    const [total, setTotal] = useState(0)
    const [location, setLocation] = useState("")

    useEffect(() => {
        const getCart = JSON.parse(localStorage.getItem('FARM_CART')) || []
        setCartItems(getCart)
        setTotal(getCart.reduce((accum, v) => accum += Number(v?.price), 0))
        console.log("Cartsitems ", getCart)

        const user = JSON.parse(localStorage.getItem('FARM_USER'))
        //all orders


    }, []) 

    async function placeOrder() {
        try{
        const user = JSON.parse(localStorage.getItem('FARM_USER'))
        let orders = []

        for(const item of cartItem) {
            
            let newOrder = {}
            newOrder['userId'] = user?.id
            newOrder['productId'] = item?.id
            newOrder['quantity'] = 1
            newOrder['totalPrice'] = Number(item?.price)
            newOrder['status'] = "pending"
            newOrder['location'] = location

            orders.push(newOrder)
        }

        const response = await fetch('http://localhost:3000/api/order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user, orders}),
          });

          if (response.ok) {
            const data = await response.json();
            console.log("orders created:", data);
            localStorage.setItem('FARM_CART', JSON.stringify([]))
            toast.success("placed orders successfully")
          } else {
              toast.error(String("error placing orders"))
          }
        } catch (error) {
      
          toast.error(`Error placing orders: ${error}`);
        }


    }

    const CartItem = ({ item, itemKey}) => {
        return (
            <div className="flex flex-row items-center border-b border-b-gray-300 w-full justify-between">
                <div className="space-y-2 flex flex-row">
                <img src={item?.image} alt="item img" className="w-24 rounded-md" />
                    <div className="space-y-1">
                        <div className="text-gray-600 font-bold tracking-tight text-sm">{item?.name}</div>
                        <div className="text-gray-400 font-semibold text-xs">{item?.location}</div>
                    </div>
                </div>

                <div className="text-xl font-bold self-center flex flex-row items-center space-x-2">
                    <div> ${item?.price}</div>
                     <div onClick={() => {
                        let newCartItem = cartItem.filter(i => i?.id !== item?.id)
                        localStorage.setItem('FARM_CART',JSON.stringify(newCartItem))
                        setCartItems(newCartItem)
                     }}>
                        <img src={del} className="w-4 hover:scale-105 scale-100 cursor-pointer" />
                     </div>
                </div>
                

            </div>
        )

    }
  return (
    <div className="relative bg-gray-100 min-h-screen h-full w-screen flex flex-row items-center justify-center gap-4">
      <span
        onClick={() => navigate(-1)}
        className="absolute w-10 top-10 left-10 rounded-full border border-gray-300 p-2 mr-2 cursor-pointer hover:border-orange-100"
      >
        <img src={backkey} className="w-full h-full" />
      </span>

      <div className="p-8 bg-white shadow-md rounded-md w-full max-w-lg space-y-4">
        <div className="text-gray-400 text-xs ">orders</div>

        {cartItem && cartItem.map((c, idx) => <CartItem key={idx} item={c} />)}

        <div className="flex flex-row items-center justify-between w-full pt-4">
            <div className="font-semibold text-lg">Total</div>
            <div className="font-bold text-2xl">${total}</div>
        </div>

        <div>
          <input className="w-full p-2 border border-gray-400 rounded-md outline-none" placeholder="enter location" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>

        <button
        onClick={placeOrder}
        className="p-2 w-full bg-green-500 hover:bg-green-400 cursor-pointer rounded-sm text-white">
            place order
        </button>
      </div>

     {/* <div className="bg-green-300 p-6">
      {orderS && orderS.map(ord => {
        <div>
            <div>order ID: {ord.id}</div>
            <div>{ord.status}</div>
        </div>
      })}
     </div> */}

    </div>
  );
}

export default Cart;
