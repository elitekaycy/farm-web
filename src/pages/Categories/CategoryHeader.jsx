import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CategoryHeader({  name, id }) {
  const navigate = useNavigate();
  const [types, setTypes] = useState()

  useEffect(() => {
    fetch("http://localhost:3000/api/types")
    .then((response) => response.json())
    .then((data) => setTypes(data));
  }, [])

  return (
    <div className="flex flex-row items-center justify-center w-full">
    <div className="flex flex-row items-center justify-center space-x-4 p-3 bg-white rounded-full max-w-6xl w-auto shadow-sm">
      <div
       onClick={() => navigate('/categories', { replace: true })}
        className={`${
          name === 'allproducts'
            ? "text-black bg-orange-100 hover:bg-gray-50"
            : "text-black hover:bg-gray-100"
        } rounded-full font-semibold tracking-tight px-6 p-2 cursor-pointer`}
      >
        all products
      </div>
      {types &&
        types.map((t) => (
          <div key={t?.id}
            onClick={() => navigate(`/categories/${t?.name}/${t?.id}`, { replace: true })}
            className={`${
              t?.id === id
                ? "text-black bg-orange-100 hover:bg-gray-50"
                : "text-black hover:bg-gray-100"
            } rounded-full px-6 p-2 font-semibold tracking-tight cursor-pointer`}
          >
            {t?.name}
          </div>
        ))}
    </div>
    </div>
  );
}

export default CategoryHeader;
