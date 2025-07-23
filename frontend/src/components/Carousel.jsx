import React from 'react'
import { assets } from '../assets/assets'

const Carousel = () => {
    return (
        <div className='flex flex-col sm:flex-row border border-gray-400'>
            <img className='w-full' src={assets.hero_img} alt="" />
        </div>
    )
}

export default Carousel
