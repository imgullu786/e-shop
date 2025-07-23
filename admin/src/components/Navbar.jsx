import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import {toast} from 'react-hot-toast';

const Navbar = ({setToken}) => {
  const [visible, setVisible] = useState(false);


  return (
    <div className="flex items-center justify-between py-3 px-4 sm:py-5 font-medium shadow-sm bg-white">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} className="w-24 object-contain" alt="Logo" />
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden sm:flex gap-6 text-sm text-gray-700">
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to='/add' className='flex flex-col items-center gap-1'>
                <p>ADD PRODUCTS</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/list' className='flex flex-col items-center gap-1'>
                <p>LIST PRODUCTS</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/orders' className='flex flex-col items-center gap-1'>
                <p>ORDERS</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>

        </ul>
      </ul>
      <button 
        onClick={()=>{
          setToken('');
          toast.success('Logged out successfully');
        }} 
        className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-2xl text-xs sm:text-sm'>
          Logout
      </button>

      {/* Mobile Menu Icon */}
      <img
        onClick={() => setVisible(true)}
        src={assets.menu_icon}
        className="w-6 cursor-pointer sm:hidden"
        alt="Menu"
      />

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out ${
          visible ? 'w-2/3 p-4' : 'w-0 p-0'
        } overflow-hidden z-50`}
      >
        <div className="flex flex-col text-gray-700">
          {/* Back Button */}
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-2 mb-4 cursor-pointer"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="Back" />
            <p className="text-sm">Back</p>
          </div>

          {/* Mobile Links */}
          <NavLink onClick={() => setVisible(false)} to="/add" className="py-2 pl-2 hover:bg-gray-50"> Add Products </NavLink>
          <NavLink onClick={() => setVisible(false)} to="/list" className="py-2 pl-2 hover:bg-gray-50"> Listed Products </NavLink>
          <NavLink onClick={() => setVisible(false)} to="/orders" className="py-2 pl-2 hover:bg-gray-50"> Orders </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
