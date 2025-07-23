import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Orders = () => {
  const { products } = useContext(ShopContext);

  return (
    <div className="border-t pt-16 px-4 sm:px-10 lg:px-20 max-w-7xl mx-auto min-h-[70vh]">
      <div className="text-2xl mb-8">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div className="space-y-6">
        {products.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 flex flex-col md:flex-row md:justify-between md:items-center gap-6 shadow-sm"
          >
            {/* Left: Product Info */}
            <div className="flex items-start gap-4">
              <img
                src={item.image[0]}
                alt={item.name}
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
              />
              <div className="text-sm sm:text-base">
                <p className="font-medium">{item.name}</p>
                <div className="flex gap-4 mt-2 text-gray-600 text-sm sm:text-base">
                  <p>₹ {item.price}</p>
                  <p>Quantity: 1</p>
                  <p>Size: L</p>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Date: <span className="text-gray-400">25 May, 2024</span>
                </p>
              </div>
            </div>

            {/* Right: Status + Action */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:w-1/2">
              <div className="flex items-center gap-2">
                <p className="text-sm sm:text-base text-red-600 font-medium">⚡ Ready to ship</p>
              </div>
              <button className="border border-gray-300 px-5 py-2 text-sm rounded hover:bg-gray-50 transition">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
