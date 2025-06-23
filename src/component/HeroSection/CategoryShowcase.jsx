"use client";

import Link from "next/link";
import {
  Smartphone,
  Headphones,
  Home,
  Keyboard,
  Watch,
  Gamepad2,
  Sparkles,
  Trophy,
  Percent,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const iconMap = {
  "/collections/new-arrivals": Sparkles,
  "/collections/best-seller": Trophy,
  "/deals": Percent,
  "/collections/mobile-essentials": Smartphone,
  "/collections/audio": Headphones,
  "/collections/smart-home": Home,
  "/collections/computer-accessories": Keyboard,
  "/collections/wearables": Watch,
  "/collections/gaming-gear": Gamepad2,
};

const showcaseCategories = [
  { name: "New Arrivals", href: "/collections/new-arrivals" },
  { name: "Best Sellers", href: "/collections/best-seller" },
  { name: "Deals", href: "/deals" },
  { name: "Mobile", href: "/collections/mobile-essentials" },
  { name: "Audio", href: "/collections/audio" },
  { name: "Smart Home", href: "/collections/smart-home" },
  { name: "Accessories", href: "/collections/computer-accessories" },
];

export default function CategoryShowcase() {
  return (
    <div className="py-10 md:py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12 px-4">
          Shop by Category
        </h2>

        <div className="lg:hidden relative">
          <Swiper
            slidesPerView="auto"
            spaceBetween={20}
            freeMode={true}
            className="!px-4"
          >
            {showcaseCategories.map((category) => {
              const IconComponent = iconMap[category.href] || Smartphone;
              return (
                <SwiperSlide key={category.name} className="!w-auto">
                  <Link
                    href={category.href}
                    className="flex flex-col items-center text-center group"
                  >
                    <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 group-hover:bg-blue-600 group-hover:scale-105">
                      <IconComponent className="w-6 h-6 text-blue-600 transition-colors duration-300 group-hover:text-white" />
                    </div>
                    <p className="mt-3 font-semibold text-gray-700 text-sm w-20 truncate">
                      {category.name}
                    </p>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
          {/* Fading edge for swiper */}
          <div className="absolute top-0 bottom-0 left-0 w-6 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-6 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
        </div>

        <div className="hidden lg:grid grid-cols-7 gap-y-8 gap-x-4 px-4">
          {showcaseCategories.map((category) => {
            const IconComponent = iconMap[category.href] || Smartphone;
            return (
              <Link
                href={category.href}
                key={category.name}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 group-hover:bg-blue-600 group-hover:scale-105 group-hover:shadow-xl">
                  <IconComponent className="w-8 h-8 text-blue-600 transition-colors duration-300 group-hover:text-white" />
                </div>
                <p className="mt-4 font-semibold text-gray-700 text-base">
                  {category.name}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
