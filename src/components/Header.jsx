import React, { useEffect, useState } from "react";
import agrolink from "../assets/agrolink.png";
import { useNavigate } from "react-router-dom";
import cartImg from "../assets/cart.png";

function Header({ page }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const getUser = localStorage.getItem("FARM_USER") || null;
    const getCart = JSON.parse(localStorage.getItem("FARM_CART")) || [];
    setCart(getCart);
    console.log("get user ", getUser);
    setUser(JSON.parse(getUser));
  }, []);

  return (
    <header className="flex justify-between items-center p-6">
      <div
        className="w-32 cursor-pointer"
        onClick={() => navigate("/", { replace: true })}
      >
        <img alt="logo" src={agrolink} className="w-full" />
      </div>
      <nav className="flex space-x-2">
        <a
          href="/"
          className={`${
            page === "home"
              ? "text-dark rounded-full bg-orange-100"
              : "text-green-500 hover:text-green-400"
          } font-semibold text-sm px-4 p-2`}
        >
          home
        </a>
        <a
          href="/categories"
          className={`${
            page === "farmshop"
              ? "text-dark rounded-full bg-orange-100"
              : "text-green-500 hover:text-green-400"
          } font-semibold text-sm px-4 p-2`}
        >
          Farm shop
        </a>
        <a
          href="/about"
          className={`${
            page === "about us"
              ? "text-dark rounded-full bg-orange-100"
              : "text-green-500 hover:text-green-400"
          } font-semibold text-sm px-4 p-2`}
        >
          about us
        </a>
      </nav>
      {user && (
        <div className="flex flex-row items-center space-x-3">
          <div className="font-semibold p-3 px-4 rounded-full border border-1 border-gray-300">
            {user?.username}
          </div>
          {/* <div className="font-semibold p-3 px-4 rounded-full border border-1 border-gray-300 space-x-2 cursor-pointer hover:border-green-500">cart <span>0</span></div>    */}
          <div 
          onClick={() => navigate('/user/cart')}
          className="relative cursor-pointer scale-100 hover:scale-105">
            <div className="absolute -top-1 left-5 w-3 h-3 rounded-full bg-red-500 border border-1 border-white flex flex-row p-2 items-center justify-center">
              <div className="text-xs text-white font-semibold">{cart.length}</div>
            </div>
            <img src={cartImg} className="w-6" alt="cart" />
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("FARM_USER");
              navigate("/login", { replace: true });
            }}
            className="font-medium text-xs bg-green-50 hover:bg-green-100 rounded-lg p-2 px-4"
          >
            logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
