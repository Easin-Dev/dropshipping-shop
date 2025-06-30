"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slidesData = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1550009158-94ae7655244d?q=80&w=1974&auto=format&fit=crop",
    alt: "Gaming setup with neon lights",
    title: "Upgrade Your Gaming Setup",
    subtitle: "Explore our new collection of high-performance gaming gear.",
    buttonText: "Shop Gaming Gear",
    buttonLink: "/collections/gaming-gear",
  },
  {
    type: "video",
    src: "",
    title: "Step into the Future",
    subtitle: "Discover the latest in smart home and wearable technology.",
    buttonText: "Explore Smart Devices",
    buttonLink: "/collections/smart-home",
  },
  {
    type: "image",
    src: "",
    alt: "Close-up of a computer motherboard",
    title: "Power and Performance",
    subtitle: "Find the best accessories to boost your computer's potential.",
    buttonText: "View Accessories",
    buttonLink: "/collections/computer-accessories",
  },
];

export default function HeroSection() {
  return (
    <>
      <div className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh] text-white">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          // effect = fade
          className="mySwiper h-full w-full"
        >
          {slidesData.map((slide, index) => (
            <SwiperSlide key={index} className="relative">
              {slide.type === "image" ? (
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  priority={index === 0}
                />
              ) : (
                <video
                  src={slide.src}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              )}

              <div className="absolute inset-0 bg-black/50"></div>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-lg animate-fade-in-down">
                  {slide.title}
                </h1>
                <p className="mt-4 max-w-2xl text-lg md:text-xl text-gray-200 drop-shadow-lg animate-fade-in-up">
                  {slide.subtitle}
                </p>
                <Link href={slide.buttonLink}>
                  <button className="mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-bold transition-all duration-300 transform hover:scale-105 animate-fade-in-up">
                    {slide.buttonText}
                  </button>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #ffffff !important;
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: 50%;
          width: 44px !important;
          height: 44px !important;
          transition: background-color 0.3s;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background-color: rgba(0, 0, 0, 0.6);
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 18px !important;
          font-weight: 900 !important;
        }
        .swiper-pagination-bullet {
          background-color: rgba(255, 255, 255, 0.7) !important;
          width: 10px !important;
          height: 10px !important;
          transition: background-color 0.3s;
        }
        .swiper-pagination-bullet-active {
          background-color: #ffffff !important;
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out 0.4s forwards;
          opacity: 0;
        }
      `}</style>
    </>
  );
}
