"use client";

import Link from 'next/link';
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
} from 'lucide-react';

const iconMap = {
  '/collections/new-arrivals': Sparkles,
  '/collections/best-seller': Trophy,
  '/deals': Percent,
  '/collections/mobile-essentials': Smartphone,
  '/collections/audio': Headphones,
  '/collections/smart-home': Home,
  '/collections/computer-accessories': Keyboard,
  '/collections/wearables': Watch,
  '/collections/gaming-gear': Gamepad2,
};

const showcaseCategories = [
    { name: 'New Arrivals', href: '/collections/new-arrivals' },
    { name: 'Best Sellers', href: '/collections/best-seller' },
    { name: 'Deals', href: '/deals' },
    { name: 'Mobile', href: '/collections/mobile-essentials' },
    { name: 'Audio', href: '/collections/audio' },
    { name: 'Smart Home', href: '/collections/smart-home' },
    { name: 'Accessories', href: '/collections/computer-accessories' },
];

export default function CategoryShowcase() {
  return (
    <div className=" py-12 md:py-3">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12 mt-6">
          Shop by Category
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-y-8 gap-x-4">
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
                <p className="mt-4 font-semibold text-gray-700 text-sm md:text-base">
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
