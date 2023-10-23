import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import CategoryHeader from "./CategoryHeader";
import ProductLayout from "./ProductLayout";

function Categories() {
  const [types, setTypes] = useState([]);
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((response) => response.json())
      .then((data) => {
        console.log("products are ", data)
        setProducts(data)});

    fetch("http://localhost:3000/api/types")
      .then((response) => response.json())
      .then((data) => setTypes(data));
  }, []);


  return (
    <div className="bg-gray-100 min-h-screen">
      <Header page={"farmshop"} />
      <CategoryHeader name={"allproducts"} id={null} />
      <ProductLayout products={products} />
    </div>
  );
}

export default Categories;
