"use client";

import { useState } from 'react';
import Image from 'next/image';
import { X, Search } from 'lucide-react';

export default function SearchPopup({ isOpen, onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 bg-white/40 backdrop-blur-sm">
      <div className={`w-full bg-white px-4 sm:px-10 py-10 shadow-lg ${isClosing ? "animate-slideUp" : "animate-slideDown"} relative`}>
        <div className="flex justify-center">
          <Image src="http://zaylio.com/cdn/shop/files/IMG_7837_fdf1f912-f737-4279-bc0b-8166051a6150.jpg?v=1744288937&width=200" alt="alt" width={200} height={200} />
        </div>
        <button onClick={handleClose} className="absolute top-6 right-6 text-gray-500 hover:text-red-500 p-1">
          <X size={24} />
        </button>
        <form action="/search" method="get" role="search" className="max-w-2xl mx-auto">
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <input type="search" name="q" placeholder="Search" autoComplete="off" className="w-full px-4 py-2 outline-none" />
            <button type="submit" className="px-4 text-gray-500 hover:text-black cursor-pointer">
              <Search size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}