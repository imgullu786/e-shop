import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { id } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    const selectedProduct = products.find((item) => item._id === id);
    if (selectedProduct) {
      setProductData(selectedProduct);
      setImage(selectedProduct.image[0]);
    }
  }, [id, products]);

  return productData ? (
    <div className="pt-10 px-4 sm:px-10 lg:px-20 max-w-7xl mx-auto animate-fadeIn">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* ---------- Product Images ---------- */}
        <div className="flex-1 flex flex-col-reverse lg:flex-row gap-4">
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:w-[100px]">
            {productData.image.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Thumbnail ${i}`}
                onClick={() => setImage(img)}
                className={`cursor-pointer rounded border hover:border-red-400 ${
                  img === image ? 'border-red-500' : 'border-gray-200'
                } w-20 h-20 object-cover`}
              />
            ))}
          </div>
          <div className="flex-1">
            <img
              src={image || productData.image[0]}
              alt="Selected"
              className="w-full object-contain rounded-md shadow-sm max-h-[500px]"
            />
          </div>
        </div>

        {/* ---------- Product Info ---------- */}
        <div className="flex-1 space-y-5">
          <h1 className="text-3xl font-semibold">{productData.name}</h1>
          <div className="flex items-center space-x-1 text-yellow-400">
            {[...Array(3)].map((_, i) => (
              <img key={i} className="w-4" src={assets.star_icon} alt="star" />
            ))}
            <img className="w-4" src={assets.star_dull_icon} alt="star" />
            <img className="w-4" src={assets.star_dull_icon} alt="star" />
            <span className="text-gray-600 text-sm ml-2">(467 reviews)</span>
          </div>
          <p className="text-2xl font-bold text-red-600">₹ {productData.price}</p>
          <p className="text-gray-600 leading-relaxed">{productData.description}</p>

          <div className="mt-6">
            <p className="font-medium mb-2">Select Size</p>
            <div className="flex gap-3 flex-wrap">
              {productData.sizes.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 border rounded-md text-sm transition ${
                    size === s ? 'border-red-500 bg-red-100' : 'bg-gray-100 border-gray-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(productData._id, size)}
            className="mt-6 bg-black text-white py-3 px-8 text-sm rounded hover:bg-gray-800 disabled:opacity-50"
            disabled={!size}
          >
            {size ? 'ADD TO CART' : 'SELECT SIZE FIRST'}
          </button>

          <div className="border-t pt-6 text-gray-500 text-sm space-y-1">
            <p>✔ 100% Original Products</p>
            <p>✔ Cash on Delivery Available</p>
            <p>✔ Easy 7-Day Return & Exchange</p>
          </div>
        </div>
      </div>

      {/* ---------- Description & Reviews Tabs ---------- */}
      <div className="mt-16">
        <div className="flex border-b text-sm">
          <button className="px-5 py-3 font-medium border-b-2 border-black">Description</button>
          <button className="px-5 py-3 text-gray-500">Reviews (122)</button>
        </div>
        <div className="mt-6 text-gray-600 leading-relaxed text-sm space-y-4">
          <p>
            An e-commerce website is an online platform that facilitates the buying and selling of
            products or services over the internet. It serves as a virtual marketplace where
            businesses and individuals can showcase their products, interact with customers, and
            conduct transactions without a physical presence.
          </p>
          <p>
            E-commerce websites typically display products or services along with descriptions,
            images, prices, and variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant details.
          </p>
        </div>
      </div>

      {/* ---------- Related Products ---------- */}
      <div className="mt-20">
        <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
      </div>
    </div>
  ) : (
    <div className="p-10 text-center text-gray-400 animate-pulse">Loading Product...</div>
  );
};

export default Product;