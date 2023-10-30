import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import CategoryHeader from "./Categories/CategoryHeader";
import ProductLayout from "./Categories/ProductLayout";
import backkey from "../assets/backkey.png";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { typeId, farmerId, id } = useParams();
  const [contactme, setContactme] = useState(false);
  const [tab, setTab] = useState("description");
  const [product, setProduct] = useState({});
  const [farmerDetails, setFarmerDetails] = useState(null);
  const navigate = useNavigate();
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [description, setDescription] = useState("")


  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("products are ", data);
        setProduct(data);
      });

    fetch(`http://localhost:3000/api/products/type/${typeId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("products are ", data);
        setRelatedProducts(data);
      });

    fetch(`http://localhost:3000/api/farmers/${farmerId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("products are ", data);
        setFarmerDetails(data);
      });
  }, [id, typeId, farmerId]);

  return (
    <>
      <div className="bg-gray-100">
        <Header page={"farmshop"} />
        {/* <CategoryHeader page={""} id={null} /> */}
        <div className="container mx-auto p-4">
          <div className="text-xs tracking-tight flex flex-row items-center text-gray-400 mb-4 space-x-4">
            <span
              onClick={() => navigate(-1)}
              className="w-10 rounded-full border border-gray-300 p-2 mr-2 cursor-pointer hover:border-orange-100"
            >
              <img src={backkey} className="w-full h-full" />
            </span>
            {`product/${product.name}`}
          </div>

          <div className="flex flex-row items-center space-x-8 flex-wrap justify-center">
            <div className="bg-orange-100 w-full max-w-xl rounded-xl">
              <img src={product.image} alt="pr-name" className="w-full" />
            </div>

            <div className="p-8 flex-1 space-y-4">
              <div className="text-5xl tracking-tight font-semibold">
                {product.name}
              </div>
              <div className="text-3xl tracking-tight text-gray-400">
                ${product.price}
              </div>

              <div className="tracking-wide h-full p-2">
                {product.description}
              </div>

              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const getCart =
                      JSON.parse(localStorage.getItem("FARM_CART")) || [];
                    localStorage.setItem(
                      "FARM_CART",
                      JSON.stringify([...getCart, product])
                    );
                    toast.success("successfully added to cart");
                  }}
                  className="p-2 text-white font-semibold hover:bg-green-400 max-w-sm w-full bg-green-500 rounded-lg"
                >
                  add to cart
                </button>
              </div>

              <div className="bg-white rounded-md max-w-sm w-full space-y-4 shadow-sm p-4 flex flex-col ">
                <div className="flex flex-row items-center space-x-6">
                  <div className="rounded-full p-8 bg-gray-100"> </div>
                  <div>
                    <div className="font-bold tracking-tight">
                      {farmerDetails?.username}
                    </div>
                    <div className="text-gray-400 text-xs font-semibold">
                      {farmerDetails?.location}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row items-center gap-2 justify-center">
                  <a
                    href={farmerDetails?.gps}
                    className="flex-1 font-medium bg-green-400 cursor-pointer text-white hover:bg-green-300 text-center p-2 rounded-lg"
                  >
                    find me
                  </a>
                  <button
                    onClick={() => setContactme(!contactme)}
                    className="flex-1 font-semibold cursor-pointer bg-gray-200 text-white hover:bg-gray-300 text-center p-2 rounded-lg"
                  >
                    Contact me
                  </button>
                </div>
              </div>
                {contactme && (
                <div className="max-w-md space-y-3 w-full bg-white rounded-md shadow-md p-4">
                  <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                   placeholder="name"
                   className="w-full bg-gray-100 rounded-sm p-3 font-semibold text-black"
                  />

                  <input
                   value={email}
                   onChange={(e) =>  setEmail(e.target.value)}
                   placeholder="email"
                   className="w-full bg-gray-100 rounded-sm p-3 font-semibold text-black"
                  />

                  <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="enter message description"
                  className="w-full bg-gray-100 rounded-sm p-3 font-semibold text-black"
                  />

                  <button
                  onClick={async() => {
                    if(email === '' || name === '' || description === '') return toast.error("cannot submit empty fields")

                    await fetch(`http://localhost:3000/api/report`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ id: id, productId: id, description: `${name} # ${description} # ${email}`})
                    })

                    toast.success("message sent successfully")

                    setName("")
                    setEmail("")
                    setDescription("")
                    

                  }}
                  className="w-full text-white font-semibold text-center p-3 cursor-pointer hover:bg-green-400 bg-green-500">
                    submit message
                  </button>

                </div>)}
            </div>
          </div>

          {/* <div className="flex p-2 border-2 items-center border-gray-200">
          <div className="w-72">
            <img src={product.image} alt={product.name} className="w-full" />
          </div>
          <div className="w-1/2 pl-4">
            <h1 className="text-4xl font-black mb-2">{product.name}</h1>
            <p className="text-lg font-semibold mb-2">
              Price: ${product.price}
            </p>
            <p className="text-lg font-semibold mb-2">
              Quantity: {product.quantity}
            </p>
            <p className="text-lg font-semibold mb-2">
              location: {product.location}
            </p>
            <button className="bg-green-500 w-full max-w-xs rounded-sm text-white py-2 px-4 ">
              Message
            </button>
          </div>
        </div> */}

          {/* <div className="mt-4">
          <div className="flex">
            <button
              className={`py-2 px-4 mr-2 ${
                tab === "description"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setTab("description")}
            >
              Description
            </button>
            <button
              className={`py-2 px-4 ${
                tab === "farmer" ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setTab("farmer")}
            >
              Farmer Detail
            </button>
          </div>

          {tab === "description" && (
            <div className="mt-4 p-4 rounded-md bg-gray-100">
              {product.description}
            </div>
          )}

          {tab === "farmer" && farmerDetails && (
            <div className="mt-4 p-4 rounded-md bg-gray-100">
              <h2 className="text-xl font-semibold">Farmer Details</h2>
              <p>Name: {farmerDetails.username}</p>
              <p>Location: {farmerDetails.location}</p>
              <p>Contact: {farmerDetails.phoneNumber}</p>
              <p>Bio: {farmerDetails.bio} </p>
              <a className="text-green-400 hover:text-green-500 hover:underline cursor-pointer" href={farmerDetails.gps}>farmer location: {farmerDetails.gps}</a>
            </div>
          )}
        </div> */}

          <div className="mt-20">
            <h2 className="text-2xl font-bold tracking-tight text-center">
              Related Products
            </h2>
            <ProductLayout products={relatedProducts} />
            {/* <div className="flex flex-wrap">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="w-1/4 p-4">
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="w-full mb-2"
                />
                <p className="font-semibold">{relatedProduct.name}</p>
                <p>${relatedProduct.price}</p>
                <button
              onClick={() => navigate(`/product/${relatedProduct.typeId}/${relatedProduct.farmerId}/${relatedProduct.id}`, { replace: true})}
                className="bg-green-500 w-full cursor-pointer max-w-xs rounded-sm text-white py-2 px-4 ">
              view product
            </button>
              </div>
            ))}
          </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
