import React from 'react'
import ProductCard from './ProductCard';

const ProductList = ({ data }) => {
  return (
    <>
      {
        data?.map((value, index) => {
          return (
            <ProductCard item={value} key={index} />
          )
        })
      }
    </>
  )
}

export default ProductList