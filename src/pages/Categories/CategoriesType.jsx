import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/Header'
import CategoryHeader from './CategoryHeader'
import ProductLayout from './ProductLayout'

function CategoriesType() {
    const params = useParams()
    const { type, id } = params
    const [products, setProducts] = useState([])

    useEffect(() => {

        fetch(`http://localhost:3000/api/products/type/${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("products are ",type, data)
          setProducts(data)})

    }, [id, type])
  return (
    <div className='bg-gray-100 min-h-screen'>
        <Header page={"farmshop"} />
        <CategoryHeader name={type} id={Number(id)} />
        <ProductLayout products={products} />
    </div>
  )
}

export default CategoriesType