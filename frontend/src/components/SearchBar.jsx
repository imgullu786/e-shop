import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);

  useEffect(() => {
    if (location.pathname.includes('collection') && showSearch) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [location, showSearch]);

  return showSearch && visible ? (
    <div className='flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full shadow-sm border border-gray-300'>
      <input
        className='bg-transparent outline-none text-sm w-36 sm:w-48 md:w-64'
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        type="text"
        placeholder='Search'
      />
      <img className='w-4' src={assets.search_icon} alt="search" />
      <img
        onClick={() => setShowSearch(false)}
        className='w-3 cursor-pointer'
        src={assets.cross_icon}
        alt="close"
      />
    </div>
  ) : null
}

export default SearchBar;
