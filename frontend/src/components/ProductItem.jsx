import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {
  return (
    <Link
      to={`/product/${id}`}
      onClick={() => window.scrollTo(0, 0)}
      className="group block overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-500 ease-in-out transform hover:-translate-y-1"
    >
      {/* Product Image */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
        <img
          src={image[0]}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
      </div>

      {/* Product Info */}
      <div className="p-3 transition-all duration-500 ease-in-out">
        <p className="text-gray-800 font-medium text-sm mb-1 group-hover:text-black group-hover:translate-x-1 transition-all duration-300">
          {name}
        </p>
        <p className="text-gray-900 font-semibold text-sm transition-opacity duration-300 group-hover:opacity-90">
          ₹ {price}
        </p>
      </div>
    </Link>
  )
}

export default ProductItem
