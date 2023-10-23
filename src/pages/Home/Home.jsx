import React from "react";
import "./Home.css";
import agrolink from "../../assets/agrolink.png";
import service1 from "../../assets/service1.png";
import service2 from "../../assets/service2.png";
import service3 from "../../assets/service3.png";
import farmbox from "../../assets/farmbox.png";
import meatfish from "../../assets/meatfisth.png";
import diary from "../../assets/diary.png";
import lowwaste from "../../assets/lowwaste.png";
import humane from "../../assets/humane.png";
import beyond from "../../assets/beyond.png";
import regen from "../../assets/regen.png";

import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

const HomePage = () => {
  const navigate = useNavigate();

  const service = [
    {
      img: service1,
      header: "SUBSCRIBE OR SHOP",
      text: "subscribe to a farmbox or shop groceries a la carte",
      link: "",
    },
    {
      img: service2,
      header: "FARMERS PROFILE",
      text: "view our well esteemed farmers from various regions",
      link: "/farmers",
    },
    {
      img: service3,
      header: "EXPLORE WEBSITE",
      text: "Browse Through our website or farm box to view our products",
      link: "",
    },
  ];

  const product = [
    {
      img: farmbox,
      header: "FARM BOXES",
      link: "/",
    },
    {
      img: meatfish,
      header: "MEAT & FISH",
      link: "/",
    },
    {
      img: diary,
      header: "DIARY & EGGS",
      link: "/",
    },
  ];

  const partners = [
    {
      img: beyond,
      text: "Beyond Organic Always Seasonal",
    },
    {
      img: humane,
      text: "Humane Practices Pasture-Raised",
    },
    {
      img: regen,
      text: "Regenerative agriculture Non-GMO",
    },
    {
      img: lowwaste,
      text: "Low Waste Compostable Packaging",
    },
  ];

  return (
    <div className="homepage">
     <Header page={"home"}/>

      {/* <div className="hero flex flex-col items-center justify-center bg-cover bg-center text-center text-white space-y-6 mb-11 rounded-b-3xl">
        <h1 className="text-8xl font-bold">Agrolink</h1>
        <p className="text-4xl font-semibold">Farm to Crown Height</p>
        <div className="bg-green-500 p-4 rounded-full hover:bg-green-400 text-white px-6 max-w-xs w-full text-center font-bold text-xl">
          Get Started
        </div>
      </div> */}

      <div className="w-full flex flex-row items-center">
        <div className="flex z-10 h-full bg-green-500 flex-1 flex-col max-w-lg w-full p-8 space-y-8">
          <div className="text-xs font-bold tracking-wide">Agrolink</div>
          <div className="font-bold tracking-tight text-6xl">Healthy and Organic Farm Foods</div>
          <div className="text-sm text-white">
          Discover the freshest, locally-sourced goods right at your fingertips. Our platform connects you directly with passionate farmers and producers.Browse a diverse range of farm-fresh products, organic vegetables to farm-raised meats and artisanal dairy products. By choosing to support local farmers, you're not just getting top-quality goods; you're also strengthening your community and contributing to a greener, more ethical food system.
          </div>
          <div className="w-full bg-green-400 text-white hover:underline cursor-pointer rounded-md p-2 text-center font-semibold">
            learn more
          </div>

        </div>

        <div className="hero hidden sm:flex rounded-l-md flex-1">
        </div>

      </div>

      <section className="services text-center py-20">
        <h2 className="text-4xl tracking-tighter font-bold mb-14">
          The Farmer's Market Delivered
        </h2>
        <div className="flex justify-center space-x-8 mt-4 flex-wrap">
          {service &&
            service.map((v) => (
              <div
                onClick={() => navigate(v?.link)}
                key={v?.header}
                className="flex flex-col items-center space-y-4"
              >
                <div className="w-40">
                  <img alt="service1" src={v?.img} className="w-full" />
                </div>
                <div>
                  <div className="font-bold text-xl">{v?.header}</div>
                  <div className="text-lg tracking-tight max-w-xs w-full text-gray-600">
                    {v?.text}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      <section className="goods text-center py-10 space-y-4 bg-gray-100">
        <h2 className="text-4xl tracking-tighter font-bold mb-14">
          Shop the Goods
        </h2>
        <div className="flex justify-center space-x-8 mt-4 flex-wrap">
          {product &&
            product.map((v) => (
              <div
                key={v?.header}
                onClick={() => navigate(v?.link)}
                className="flex flex-col items-center space-y-4 cursor-pointer hover:text-green-500"
              >
                <div className="w-96">
                  <img alt="products" src={v?.img} className="w-full" />
                </div>
                <div>
                  <div className="font-bold text-xl">{v?.header}</div>
                </div>
              </div>
            ))}
        </div>
        <div className="mt-10">
          <a
            href="/categories"
            className="bg-green-500 text-white font-semibold py-2 px-6 rounded-lg mt-4 hover:bg-green-700"
          >
            Shop More
          </a>
        </div>
      </section>

      <section className="services text-center py-10">
        <div className="flex justify-center space-x-8 mt-4 flex-wrap">
          {partners &&
            partners.map((v) => (
              <div
                onClick={() => navigate(v?.link)}
                key={v?.text}
                className="flex flex-col items-center space-y-4"
              >
                <div className="w-40">
                  <img alt="service1" src={v?.img} className="w-full" />
                </div>
                <div>
                  <div className="text-lg max-w-xs w-full text-gray-600">
                    {v?.text}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      <section className="bg-green-500 relative h-[40vh] mb-10 flex flex-col justify-center items-center text-white">
        <h2 className="text-3xl font-bold mb-6">WORD ON THE STREET</h2>

        <div className="flex items-center mb-8">
    
          <blockquote className="text-center space-y-4">
            <p>
             "
             Each week's farm box is an inspiration - both to cook and to discover.There's always a delicios suprise, even in winter
             "
            </p>
            <div className="text-center">
                <div className="font-bold">ENOCK WOODMAN</div>
                <div className="font-semibold">Contribution Editor, Bon Appetit</div>
            </div>
          </blockquote>
        
        </div>

        <a
          href="/categories"
          className="bg-orange-500 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg absolute -bottom-5 left-1/2 transform -translate-x-1/2"
        >
          Shop more
        </a>
      </section>


      <footer className="text-center text-gray-400 text-xs font-bold mt-14 mb-5">
        created by @enock woodman, @Eugene Wilson, @Emmanuel Otoo
      </footer>
    </div>
  );
};

export default HomePage;
