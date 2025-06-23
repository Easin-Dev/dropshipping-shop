"use client";
import { AlignJustify, Search, ShoppingBag, UserRound, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpenCard, setIsOpenCard] = useState(false);
  const [isClosingCard, setIsClosingCard] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoginClosing, setIsLoginClosing] = useState(false);

  const handleCloseCard = () => {
    setIsClosingCard(true);
    setTimeout(() => {
      setIsOpenCard(false);
      setIsClosingCard(false);
    }, 300);
  };

  const handleLoginClose = () => {
    setIsLoginClosing(true);
    setTimeout(() => {
      setIsLoginOpen(false);
      setIsLoginClosing(false);
    }, 300);
  };

  return (
    <>
      {/* Side Menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <div
        className={`fixed top-0 left-0 h-full rounded-r-sm bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-full sm:w-[300px] p-6`}
      >
        <button
          className="mb-4 text-gray-700 hover:text-red-500 hover:border hover:rounded-full"
          onClick={() => setIsOpen(false)}
        >
          <X size={28} />
        </button>
        <div className="divider"></div>
        <nav className="flex flex-col gap-4">
          <a href="#" className="text-lg font-semibold">
            Home
          </a>
          <a href="#" className="text-lg font-semibold">
            Shop
          </a>
          <a href="#" className="text-lg font-semibold">
            About
          </a>
          <a href="#" className="text-lg font-semibold">
            Contact
          </a>
        </nav>
      </div>

      {/* Search Popup */}
      {isOpenSearch && (
        <div className="fixed top-0 left-0 w-full h-full z-50 bg-white/40 backdrop-blur-sm">
          <div
            className={`w-full bg-white px-4 sm:px-10 py-10 shadow-lg ${
              isClosing ? "animate-slideUp" : "animate-slideDown"
            } relative`}
          >
            <div className="flex justify-center">
              <Image
                src="http://zaylio.com/cdn/shop/files/IMG_7837_fdf1f912-f737-4279-bc0b-8166051a6150.jpg?v=1744288937&width=200"
                alt="alt"
                width={200}
                height={200}
              />
            </div>
            <button
              onClick={() => {
                setIsClosing(true);
                setTimeout(() => {
                  setIsOpenSearch(false);
                  setIsClosing(false);
                }, 300);
              }}
              className="absolute top-6 right-6 text-gray-500 hover:text-red-500 cursor-pointer hover:border hover:rounded-full p-1"
            >
              <X size={24} />
            </button>
            <form action="/search" method="get" role="search" className="max-w-2xl mx-auto">
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <input
                  type="search"
                  name="q"
                  placeholder="Search"
                  autoComplete="off"
                  className="w-full px-4 py-2 outline-none"
                />
                <button type="submit" className="px-4 text-gray-500 hover:text-black cursor-pointer">
                  <Search size={20} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Shopping Cart Drawer */}
      {isOpenCard && (
        <>
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={handleCloseCard}></div>
          <div
            className={`fixed top-0 right-0 h-full w-full sm:w-[350px] bg-white z-50 shadow-lg p-6 flex flex-col ${
              isClosingCard ? "animate-slideOutRight" : "animate-slideInRight"
            }`}
          >
            <button
              onClick={handleCloseCard}
              className="absolute top-4 left-4 text-gray-700 hover:text-red-500 hover:border hover:rounded-full p-1"
            >
              <X size={24} />
            </button>
            <div className="flex-grow pt-16">
              <h2 className="text-lg font-semibold mb-6">You want to buy these products.</h2>
            </div>
            <div className="mt-auto">
              <Link href="/abb_cart">
                <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
                  Go to all products
                </button>
              </Link>
            </div>
          </div>
        </>
      )}

      {/* ============== নতুন Login/Register Modal ============== */}
      {isLoginOpen && (
        <>
          <div
            className="fixed inset-0 bg-white/40 backdrop-blur-sm z-50"
            onClick={handleLoginClose}
          ></div>

          {/* Modal Card Centering Wrapper */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4">
            <div
              className={`bg-white w-full h-full sm:rounded-lg sm:h-auto sm:max-w-md relative p-8 shadow-xl ${
                isLoginClosing ? "animate-fadeOutScale" : "animate-fadeInScale"
              }`}
              onClick={(e) => e.stopPropagation()} // কার্ডের ভেতরে ক্লিক করলে যেন বন্ধ না হয়
            >
              {/* Close Button */}
              <button
                onClick={handleLoginClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500 cursor-pointer hover:border hover:rounded-full p-1"
              >
                <X size={24} />
              </button>

              {/* Modal Content */}
              <h2 className="text-2xl font-bold text-center mb-6">
                Login and Register
              </h2>
              <form>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    BD Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="01xxxxxxxxx"
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
      )}

      {/* ------------------------------------------------------- */}
      {/* Header Bar */}
      <div className="flex justify-between items-center w-full h-30 px-8">
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:block lg:hidden cursor-pointer p-1 hover:border hover:rounded-full"
          >
            <AlignJustify />
          </button>
          <button
            onClick={() => setIsOpenSearch(!isOpenSearch)}
            className="cursor-pointer hover:border hover:rounded-full p-1 hidden lg:block"
          >
            <Search />
          </button>
        </div>
        <div>
          <Link href={"/"} className="cursor-pointer">
            <Image
              src="http://zaylio.com/cdn/shop/files/IMG_7837_fdf1f912-f737-4279-bc0b-8166051a6150.jpg?v=1744288937&width=200"
              alt="alt"
              width={200}
              height={200}
            />
          </Link>
        </div>
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => setIsOpenSearch(!isOpenSearch)}
            className="cursor-pointer hover:border hover:rounded-full p-1 lg:hidden md:block"
          >
            <Search />
          </button>
          <button
            onClick={() => {
              setIsLoginOpen(true);
              setIsLoginClosing(false);
            }}
            className="cursor-pointer hover:border hover:rounded-full p-1 hidden lg:block md:block"
          >
            <UserRound />
          </button>
          <button
            onClick={() => {
              setIsOpenCard(true);
              setIsClosingCard(false);
            }}
            className="cursor-pointer hover:border hover:rounded-full p-1"
          >
            <ShoppingBag />
          </button>
        </div>
      </div>

      <style jsx>{`
        /* Search Animations */
        .animate-slideDown { animation: slideDown 0.3s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.3s ease-in forwards; }
        @keyframes slideDown {
          0% { transform: translateY(-100%); opacity: 0; }
          100% { transform: translateY(0%); opacity: 1; }
        }
        @keyframes slideUp {
          0% { transform: translateY(0%); opacity: 1; }
          100% { transform: translateY(-100%); opacity: 0; }
        }

        /* Cart Animations */
        .animate-slideInRight { animation: slideInRight 0.3s ease-out forwards; }
        .animate-slideOutRight { animation: slideOutRight 0.3s ease-in forwards; }
        @keyframes slideInRight {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0%); opacity: 1; }
        }
        @keyframes slideOutRight {
          0% { transform: translateX(0%); opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }

        .animate-fadeInScale { animation: fadeInScale 0.3s ease-out forwards; }
        .animate-fadeOutScale { animation: fadeOutScale 0.3s ease-in forwards; }
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeOutScale {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.95); }
        }
      `}</style>
    </>
  );
}