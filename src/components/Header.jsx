import React from "react";
import agrolink from '../assets/agrolink.png'
import { useNavigate } from "react-router-dom";

function Header({ page }) {
  const navigate = useNavigate()
  return (
    <header className="flex justify-between items-center p-6">
      <div className="w-32 cursor-pointer" onClick={() => navigate("/", { replace: true})}>
        <img alt="logo" src={agrolink} className="w-full" />
      </div>
      <nav className="flex space-x-2">
        <a href="/" 
          className={`${page === 'home' ? 'text-dark rounded-full bg-orange-100' : 'text-green-500 hover:text-green-400'} font-semibold text-sm px-4 p-2`}
        >
          home
        </a>
        <a
          href="/categories"
          className={`${page === 'farmshop' ? 'text-dark rounded-full bg-orange-100' : 'text-green-500 hover:text-green-400'} font-semibold text-sm px-4 p-2`}
        >
          Farm shop
        </a>
        <a
          href="/about"
          className={`${page === 'about us' ? 'text-dark rounded-full bg-orange-100' : 'text-green-500 hover:text-green-400'} font-semibold text-sm px-4 p-2`}
        >
          about us
        </a>
      </nav>
    </header>
  );
}

export default Header;
