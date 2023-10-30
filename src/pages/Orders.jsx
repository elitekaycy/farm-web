import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Orders() {
  const navigete = useNavigate();
  const [orders, setOrders] = useState([]);

  function generateRandomPhoneNumber(length) {
    const firstDigit = Math.floor(Math.random() * 9) + 1;

    const remainingDigits = Array.from({ length: length - 1 }, () =>
      Math.floor(Math.random() * 10)
    );

    const phoneNumber = `${firstDigit}${remainingDigits.join("")}`;

    return phoneNumber;
  }

  useEffect(() => {
    // Fetch a list of farmers from the database
    fetch(`http://localhost:3000/api/orders`)
      .then((response) => response.json())
      .then((data) => {
        console.log("order data ", data);
        setOrders(data);
      });
  }, []);

  function getLinkWhastapp(number, message) {
    var url =
      "https://api.whatsapp.com/send?phone=" +
      number +
      "&text=" +
      encodeURIComponent(message);

    return url;
  }

  const processOrder = async (ord) => {
    if(ord.status === "progress") {

        await fetch(`http://localhost:3000/api/status`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: "complete", id: ord.id }),
          });
      
          toast("order complete");

        return
    }
    const getFarmer = await (
      await fetch(`http://localhost:3000/api/farmers/${ord.product.farmerId}`)
    ).json();

    console.log("order => ", ord, getFarmer);
    const API_URL =
      "https://api.whatsapp.com/send?phone=PHONE_NUMBER&text=YOUR_MESSAGE";
    const message = `
        order: ${ord.id}
        user: ${ord.user.username}
        user email: ${ord.user.email}
        user phone: ${generateRandomPhoneNumber(10)}

        product detail....
        product name: ${ord.product.name}
        product price: ${ord.product.price}
        product location: ${ord.location}
        product quantity: ${ord.quantity}

        farmer detail...
        farmer name: ${getFarmer.username}
        farmer number: ${getFarmer.phoneNumber}
        farmer email: ${getFarmer.email}
        `;

    const url = getLinkWhastapp(getFarmer.phoneNumber, message);
    window.open(url, '_blank')

    await fetch(`http://localhost:3000/api/status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "progress", id: ord.id }),
    });

    toast("order in progress");
 

    // fetch(`https://api.whatsapp.com/send?phone=${getFarmer.phoneNumber}&text=${message}`,{
    //     mode: "cors"
    // })
    // .then(async () => {
    //     await fetch(`http://localhost:3000/api/status/${ord.id}`, {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ status: "progress"})
    //     })
    //     toast("order in progress")
    //     window.location.reload()
    // })
    // .catch(err => {
    //     toast.error("failed to submit error")
    // })
  };

  return (
    <div className="relative w-full h-full flex flex-row items-start space-x-4 justify-center">
      <div className="absolute top-2 left-5 text-5xl text-gray-300 font-semibold">
        Orders
      </div>

      <div className="mt-20 space-y-6 w-full">
        {orders.map((ord) => (
          // <div key={ord.id} className='space-x-2 flex flex-row items-center'>
          //     <div className='bg-white p-4 w-full rounded-md'>
          //         <span className='text-xs font-bold'>ordNo: {ord.id}</span>
          //     {` user ${ord.user.username} placed order for product ${ord.product.name} `}
          //     <span className={` cursor-pointer ${ord.status === "pending" ? 'bg-yellow-400 hover:bg-yellow-300' : 'bg-green-400'}  rounded-lg p-1 px-2 text-xs font-bold`}>
          //         {`${ord.status} process`}
          //     </span>
          //     </div>
          // </div>
          <div key={ord.id} className="space-y-3">
            <div className="text-xs tracking-wide">
              <span className="font-bold">{ord.user.username}</span> placed an
              order for <span className="font-bold">{ord.product.name}</span>
            </div>
            <div className="w-full space-y-2 bg-white rounded-md p-4 flex flex-col">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center space-x-1">
                  <span className="font-semibold text-lg text-gray-400">
                    #{ord.id}
                  </span>{" "}
                  -
                  <span className="font-semibold text-lg">
                    {ord.product.name}
                  </span>
                  <span
                    className={` cursor-pointer 
                    ${
                        ord.status === "pending"
                        ? "bg-yellow-400 hover:bg-yellow-300"
                        : ord.status === "progress" ? 'bg-blue-400 hover:bg-blue-300' : 'bg-green-500 hover:bg-green-400'
                      }
                    rounded-lg p-1 px-2 text-xs font-bold`}
                  >
                    {`${ord.status} process`}
                  </span>
                </div>

                <button
                  onClick={ord.status !== "complete" ? () => processOrder(ord) : null}
                  className={`p-1 text-xs font-semibold px-4 rounded-md
                  ${
                    ord.status === "pending"
                    ? "bg-yellow-400 hover:bg-yellow-300"
                    : ord.status === "progress" ? 'bg-blue-400 hover:bg-blue-300' : 'bg-green-500 hover:bg-green-400'
                  }
                 text-white cursor-pointer`}
                >
                  { ord.status === "pending" ? "process order" : ord.status === "progress" ? "complete order" : "completed"}
                </button>
              </div>

              <div className="flex text-xs space-x-3 text-gray-400 flex-row items-center">
                <span>location: {ord.product.location}</span>
                <span>price: {ord.product.price}</span>
                <span>user email: {ord.user.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
