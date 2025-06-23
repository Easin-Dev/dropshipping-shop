// components/CartDrawer.jsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose }) {
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
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={handleClose}></div>
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[350px] bg-white z-50 shadow-lg p-6 flex flex-col ${isClosing ? "animate-slideOutRight" : "animate-slideInRight"}`}
      >
        <button onClick={handleClose} className="absolute top-4 left-4 text-gray-700 hover:text-red-500 p-1">
          <X size={24} />
        </button>
        <div className="flex-grow pt-16">
          <h2 className="text-lg font-semibold mb-6">You want to buy these products.</h2>
        </div>
        <div className="mt-auto">
          <Link href="/abb_cart">
            <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">Go to all products</button>
          </Link>
        </div>
      </div>
    </>
  );
}