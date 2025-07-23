import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='pt-4 flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-8 my-10 text-sm border-t-1'>
        <div>
          <img className='mb-5 w-24' src={assets.logo} alt="" />
          <p className='w-full md:w-2/3 text-gray-600'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>24/7 customer support</li>
            <li>7 day return or exchange policy</li>
          </ul>
        </div>
        <div>
          <p className='text-xl font-medium mb-2'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+91 7987976741</li>
            <li>gulamgaushnitrr@gmail.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-2 text-sm text-center'>Copyright 2025@ eShop.com - All Right Reserved.</p>
      </div>

    </div>
  )
}

export default Footer
