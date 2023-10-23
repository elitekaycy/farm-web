import React from 'react'
import ProductComponent from './ProductComponent'

function ProductLayout({ products }) {
  return (
    <div className='p-6 w-full flex flex-row flex-wrap items-center justify-center space-x-2  md:space-x-6 space-y-2'>
     {products && products.map((p) => <ProductComponent key={p?.id} product={p} />)}
    </div>
  )
}

export default ProductLayout