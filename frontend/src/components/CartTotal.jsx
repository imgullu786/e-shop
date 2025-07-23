import React, { useContext } from 'react';
import Title from './Title';
import { ShopContext } from '../context/ShopContext';

const CartTotal = () => {
  const { delivery_fee, getCartAmount } = useContext(ShopContext);
  const cartAmount = getCartAmount();
  const totalAmount = cartAmount === 0 ? 0 : cartAmount + delivery_fee;

  return (
    <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg border border-gray-100">
      <div className="text-2xl mb-4">
        <Title text1="CART" text2="TOTALS" />
      </div>
      <div className="flex flex-col gap-1 text-sm text-gray-700">
        {/* Subtotal */}
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>₹ {cartAmount}.00</p>
        </div>
        <hr className="border-gray-200" />

        {/* Shipping */}
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p className={delivery_fee === 0 ? 'text-green-600' : ''}>
            ₹ {delivery_fee}
          </p>
        </div>
        <hr className="border-gray-200" />

        {/* Total */}
        <div className="flex justify-between text-base font-semibold">
          <p>Total</p>
          <p>₹ {totalAmount}.00</p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
