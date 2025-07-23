import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, navigate, cartItems, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          tempData.push({
            _id: productId,
            size,
            quantity: cartItems[productId][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="border-t pt-14 px-4 sm:px-10 lg:px-20 max-w-7xl mx-auto">
      {/* Title */}
      <div className="text-2xl mb-6">
        <Title text1="YOUR" text2="CART" />
      </div>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-8 relative">
        {/* Left - Cart Items */}
        <div className="flex-1 space-y-6">
          {cartData.length > 0 ? (
            cartData.map((item, index) => {
              const product = products.find((p) => p._id === item._id);
              if (!product) return null;

              return (
                <div
                  key={index}
                  className="border rounded-lg p-4 flex items-center justify-between gap-4 shadow-sm"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
                    />
                    <div>
                      <p className="text-base font-medium">{product.name}</p>
                      <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                        <p>₹ {product.price}</p>
                        <span className="px-3 py-1 bg-gray-100 border rounded">{item.size}</span>
                      </div>
                    </div>
                  </div>

                  <input type="number" min={1} defaultValue={item.quantity} 
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val && val > 0) updateQuantity(item._id, item.size, val);
                    }}
                    className="border px-2 py-1 w-16 rounded text-sm"
                  />

                  <img
                    src={assets.bin_icon}
                    alt="Delete"
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    className="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100"
                  />
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-center">Your cart is empty.</p>
          )}
        </div>

        {/* Right - Cart Summary (Fixed on Desktop) */}
        <div className="lg:w-[350px] lg:sticky lg:top-24 h-fit">
          <CartTotal />
          <button
            onClick={() => navigate('/place-order')}
            disabled={cartData.length === 0}
            className="w-full bg-black text-white mt-6 py-3 text-sm rounded hover:bg-gray-800 disabled:opacity-50"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
