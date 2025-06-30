// components/LoginModal.jsx
"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function LoginModal({ isOpen, onClose }) {
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
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
        onClick={handleClose}
      ></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4">
        <div
          className={`bg-white w-full h-full sm:rounded-lg sm:h-auto sm:max-w-md relative p-8 shadow-xl ${
            isClosing ? "animate-fadeOutScale" : "animate-fadeInScale"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 cursor-pointer p-1"
          >
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold text-center mb-6">
            Login and Register
          </h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder=" example@gmail.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="Password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password*
              </label>
              <input
                type="password"
                id="password"
                name="phone"
                placeholder="**************"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition font-semibold"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
