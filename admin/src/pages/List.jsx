import axios from 'axios';
import { useEffect, useState } from 'react';
import { backendUrl } from '../App';
import { toast } from "react-hot-toast";
import Title from '../components/Title';
import { assets } from '../assets/assets';

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(`${backendUrl}/api/product/remove`, { id }, {
        headers: { token },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="pt-4px-4 sm:px-10 lg:px-20 max-w-7xl w-full mx-auto">
      {/* Title */}
      <div className="text-2xl mb-6">
        <Title text1="PRODUCT" text2="LIST" />
      </div>

      {/* Product List */}
      <div className="flex flex-col gap-5 w-full">
        {list.length > 0 ? (
          list.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 flex items-center justify-between gap-4 shadow-sm w-full"
            >
              <div className="flex items-center gap-4 flex-1">
                <img
                  src={item.image?.[0] || assets.upload_area}
                  alt={item.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
                />
                <div>
                  <p className="text-base font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                    <p>₹ {item.price}</p>
                    <span className="px-3 py-1 bg-gray-100 border rounded">{item.category}</span>
                  </div>
                </div>
              </div>

              <img
                src={assets.bin_icon}
                alt="Delete"
                onClick={() => removeProduct(item._id)}
                className="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100"
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default List;
