import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router'; // ✅ Corrected here

const Banner = () => {
  return (
    <div className="max-w-8xl mx-auto h-[400px] px-4">
      <Swiper
        pagination={{ type: 'progressbar' }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper rounded-lg shadow-xl"
      >
        {/* Slide 1 */}
        <SwiperSlide className="relative h-full rounded-lg overflow-hidden">
          <div className="h-[50%] w-full">
            <img
              src="https://i.ibb.co/21fgPh3Y/479992460-1132029822201281-7028575266690086655-n.jpg"
              alt="Fresh Vegetables"
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div className="absolute top-[50%] left-0 right-0 bottom-0  bg-opacity-50 flex flex-col items-center justify-center text-white text-center p-6">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-2">Fresh Vegetables at Your Doorstep</h2>
            <p className="max-w-xl mb-4 text-sm">
              Get tomatoes, eggplants, onions, potatoes and more with just one click!
            </p>
            <Link to="/BrowseAll">
              <button className="bg-white text-green-700 font-semibold px-4 py-2 rounded hover:bg-gray-200 transition duration-300 text-sm">
                Order Now
              </button>
            </Link>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide className="relative h-full rounded-lg overflow-hidden">
          <div className="h-[50%] w-full">
            <img
              src="https://i.ibb.co/m55BGgqs/kacha-bazar-6.jpg "
              alt="Discount Offers"
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div className="absolute top-[50%] left-0 right-0 bottom-0 bg-opacity-50 flex flex-col items-center justify-center text-white text-center p-6">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-2">Weekly Special Discounts</h2>
            <p className="max-w-xl mb-4 text-sm">
              Enjoy up to 20% off on daily groceries this week only!
            </p>
            <Link to="/offer">
              <button className="bg-white text-yellow-700 font-semibold px-4 py-2 rounded hover:bg-gray-200 transition duration-300 text-sm">
                View Offers
              </button>
            </Link>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide className="relative h-full rounded-lg overflow-hidden">
          <div className="h-[50%] w-full">
            <img
              src="https://i.ibb.co/gZtHLRd4/greengrocer-selling-organic-fresh-agricultural-product-farmer-market-53876-58800.jpg"
              alt="From Farmers"
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div className="absolute top-[50%] left-0 right-0 bottom-0  bg-opacity-50 flex flex-col items-center justify-center text-white text-center p-6">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-2">Trusted Quality from Farmers</h2>
            <p className="max-w-xl mb-4 text-sm">
              All products are sourced directly from farmers – fresh and hygienic.
            </p>
            <button className="bg-white text-red-700 font-semibold px-4 py-2 rounded hover:bg-gray-200 transition duration-300 text-sm">
              Learn More
            </button>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
