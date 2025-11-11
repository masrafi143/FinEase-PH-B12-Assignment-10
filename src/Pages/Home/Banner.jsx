import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

const Banner = () => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        navigation
        className="mySwiper"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="flex flex-col justify-center items-center h-[50vh] bg-[url('https://i.pinimg.com/originals/4b/36/ab/4b36ab68b620383dc87698126aa578a0.jpg')] bg-cover bg-center text-white text-center px-4 relative">
            <div className="absolute inset-0 bg-opacity-50"></div>
            <div className="relative z-10">
              <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
                Manage Money, Build Freedom
              </h1>
              <p className="mt-4 text-lg md:text-xl font-light max-w-2xl mx-auto">
                Take control of your financial journey — start saving, tracking, and growing smarter.
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="flex flex-col justify-center items-center h-[50vh] bg-[url('https://img.freepik.com/premium-photo/midsection-business-people-analyzing-graphs-desk-office_1048944-1384731.jpg?semt=ais_hybrid&w=740&q=80')] bg-cover bg-center text-white text-center px-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
            <div className="relative z-10">
              <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
                Plan. Save. Grow.
              </h1>
              <p className="mt-4 text-lg md:text-xl font-light max-w-2xl mx-auto">
                Smart budgeting and financial awareness are the first steps to wealth creation.
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="flex flex-col justify-center items-center h-[50vh] bg-[url('https://cdn.pixabay.com/photo/2024/06/18/03/40/finance-8836902_640.jpg')] bg-cover bg-center text-white text-center px-4 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="relative z-10">
              <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
                Invest Today, Secure Tomorrow
              </h1>
              <p className="mt-4 text-lg md:text-xl font-light max-w-2xl mx-auto">
                Discover financial tools and insights that help your money work for you.
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
