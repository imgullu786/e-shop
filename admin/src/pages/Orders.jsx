import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-hot-toast';
import { assets } from '../assets/assets';
import Title from '../components/Title';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(`${backendUrl}/api/order/list`, {}, {
        headers: { token },
      });

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const status = event.target.value;
      const response = await axios.post(`${backendUrl}/api/order/status`, { orderId, status }, {
        headers: { token },
      });

      if (response.data.success) {
        fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="border-t pt-14 px-4 sm:px-10 lg:px-20 max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="text-2xl mb-6">
        <Title text1="ALL" text2="ORDERS" />
      </div>

      {/* Order List */}
      <div className="flex flex-col gap-5">
        {orders.map((order, index) => (
          <div
            key={index}
            className="border rounded-lg p-5 md:p-6 flex flex-col lg:flex-row gap-6 shadow-sm text-sm bg-white"
          >
            {/* Left Icon */}
            <img src={assets.parcel_icon} alt="Parcel" className="w-12 h-12 object-contain" />

            {/* Center Info */}
            <div className="flex-1 space-y-2">
              <div className="text-gray-800 font-medium">
                {order.items.map((item, idx) => (
                  <p key={idx}>
                    {item.name} x {item.quantity} <span className="ml-1 text-gray-500">({item.size})</span>
                  </p>
                ))}
              </div>

              <div className="pt-2 text-gray-700 text-sm">
                <p className="font-semibold">{order.address.firstName} {order.address.lastName}</p>
                <p>{order.address.street}</p>
                <p>{order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}</p>
                <p>Phone: {order.address.phone}</p>
              </div>
            </div>

            {/* Right Info */}
            <div className="flex flex-col justify-between gap-2 text-gray-700">
              <p>Items: <b>{order.items.length}</b></p>
              <p>Method: <b>{order.paymentMethod}</b></p>
              <p>Payment: <b>{order.payment ? 'Done' : 'Pending'}</b></p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              <p className="text-lg font-bold text-black">₹ {order.amount}</p>

              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
                className="border rounded px-3 py-2 mt-2 bg-gray-50 hover:bg-white focus:outline-none"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <p className="text-gray-500 text-center mt-10">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
