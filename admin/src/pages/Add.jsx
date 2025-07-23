import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-hot-toast';

const Add = ({ token }) => {
  const [images, setImages] = useState([false, false, false, false]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestseller);
      formData.append('sizes', JSON.stringify(sizes));

      images.forEach((img, i) => img && formData.append(`image${i + 1}`, img));

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setPrice('');
        setImages([false, false, false, false]);
        setSizes([]);
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="pt-16 px-4 sm:px-10 lg:px-20 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold">{`ADD PRODUCT`}</h1>

      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-8 mt-10 rounded-md shadow-sm flex flex-col gap-8"
      >
        {/* Upload Section */}
        <div>
          <p className="font-medium mb-2">Upload Images</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <label key={idx} htmlFor={`image${idx}`} className="block cursor-pointer">
                <img
                  src={img ? URL.createObjectURL(img) : assets.upload_area}
                  alt="Upload"
                  className="w-full h-24 object-cover rounded border border-gray-300 hover:border-black"
                />
                <input
                  type="file"
                  id={`image${idx}`}
                  hidden
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setImages((prev) =>
                      prev.map((im, i) => (i === idx ? file : im))
                    );
                  }}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="sm:col-span-3">
            <p className="font-medium mb-2">Product Name</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Type product name"
              required
            />
          </div>

          <div className="sm:col-span-3">
            <p className="font-medium mb-2">Product Description</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              rows="4"
              placeholder="Write product description"
              required
            />
          </div>

          <div>
            <p className="font-medium mb-2">Category</p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <p className="font-medium mb-2">Subcategory</p>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div>
            <p className="font-medium mb-2">Price</p>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="₹"
              required
            />
          </div>
        </div>

        {/* Sizes */}
        <div>
          <p className="font-medium mb-2">Available Sizes</p>
          <div className="flex flex-wrap gap-3">
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`px-4 py-2 rounded text-sm border transition ${
                  sizes.includes(size)
                    ? 'bg-black text-white border-black'
                    : 'bg-gray-100 text-gray-700 border-gray-300'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Bestseller Toggle */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="bestseller"
            checked={bestseller}
            onChange={() => setBestseller(!bestseller)}
            className="accent-black"
          />
          <label htmlFor="bestseller" className="text-sm text-gray-700">
            Add to Bestseller
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full sm:w-fit bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition"
        >
          ADD PRODUCT
        </button>
      </form>
    </div>
  );
};

export default Add;
