import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const Contact = () => {
  return (
    <div className="border-t pt-10 px-4 sm:px-10 lg:px-20 max-w-7xl mx-auto">
      {/* Title */}
      <div className="text-center text-2xl mb-10">
        <Title text1="CONTACT" text2="US" />
      </div>

      {/* Contact Content */}
      <div className="flex flex-col-reverse md:flex-row gap-12 items-center mb-28">
        {/* Left: Text Info */}
        <div className="flex-1 space-y-6 text-left">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Our Store</h2>
            <p className="mt-2 text-gray-500 leading-relaxed">
              Raipur, Chhattisgarh <br />
              India 492001
            </p>
            <p className="mt-2 text-gray-500 leading-relaxed">
              Tel: (+91) 7987976741 <br />
              Email: gulamgaushnitrr@gmail.com
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700">Careers at eShop</h2>
            <p className="mt-2 text-gray-500">Learn more about our teams and job openings.</p>
            <button className="mt-4 border border-black px-8 py-3 text-sm font-medium rounded hover:bg-black hover:text-white transition">
              Explore Jobs
            </button>
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex-1">
          <img
            src={assets.contact_img}
            alt="Contact"
            className="w-full max-w-[480px] mx-auto rounded-md shadow-sm"
          />
        </div>
      </div>

      {/* Newsletter Box */}
      <NewsletterBox />
    </div>
  );
};

export default Contact;
