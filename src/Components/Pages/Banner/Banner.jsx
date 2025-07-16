import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Link } from 'react-router'; // যদি react-router-dom ইউজ করো

const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="rounded-lg shadow-lg"
      >
        {/* Slide 1 */}
        <SwiperSlide className="relative rounded-lg overflow-hidden">
          <img
            src="https://i.ibb.co/21fgPh3Y/479992460-1132029822201281-7028575266690086655-n.jpg"
            alt="Fresh Vegetables"
            className="w-full h-[400px] object-cover rounded-lg"
          />
          <div className="absolute inset-0  bg-opacity-40 flex flex-col justify-center items-center text-white text-center px-6">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-3">
              Fresh Vegetables at Your Doorstep
            </h2>
            <p className="max-w-xl mb-5 text-sm lg:text-base">
              Get tomatoes, eggplants, onions, potatoes and more with just one click!
            </p>
            <Link to="/BrowseAll">
              <button className="bg-white text-green-700 font-semibold px-6 py-2 rounded hover:bg-gray-200 transition duration-300 text-sm">
                Order Now
              </button>
            </Link>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide className="relative rounded-lg overflow-hidden">
          <img
            src="https://i.ibb.co/m55BGgqs/kacha-bazar-6.jpg"
            alt="Weekly Offers"
            className="w-full h-[400px] object-cover rounded-lg"
          />
          <div className="absolute inset-0  bg-opacity-40 flex flex-col justify-center items-center text-white text-center px-6">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-3">
              Weekly Special Discounts
            </h2>
            <p className="max-w-xl mb-5 text-sm lg:text-base">
              Enjoy up to 20% off on daily groceries this week only!
            </p>
            <Link to="/offer">
              <button className="bg-white text-yellow-700 font-semibold px-6 py-2 rounded hover:bg-gray-200 transition duration-300 text-sm">
                View Offers
              </button>
            </Link>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide className="relative rounded-lg overflow-hidden">
          <img
            src="https://i.ibb.co/gZtHLRd4/greengrocer-selling-organic-fresh-agricultural-product-farmer-market-53876-58800.jpg"
            alt="Trusted Farmers"
            className="w-full h-[400px] object-cover rounded-lg"
          />
          <div className="absolute inset-0  bg-opacity-40 flex flex-col justify-center items-center text-white text-center px-6">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-3">
              Trusted Quality from Farmers
            </h2>
            <p className="max-w-xl mb-5 text-sm lg:text-base">
              All products are sourced directly from farmers – fresh and hygienic.
            </p>
            <button className="bg-white text-red-700 font-semibold px-6 py-2 rounded hover:bg-gray-200 transition duration-300 text-sm">
              Learn More
            </button>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
