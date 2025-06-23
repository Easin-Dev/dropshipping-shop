"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AlignJustify, Search, ShoppingBag, UserRound } from "lucide-react";

import { navLinks } from "../data/navigation";
import DesktopNav from "./DesktopNav";
import MobileDrawer from "./MobileDrawer";
import SearchPopup from "./SearchPopup";
import CartDrawer from "./CartDrawer";
import LoginModal from "./LoginModal";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const pathname = usePathname();

  return (
    <>
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
        pathname={pathname}
      />
      <SearchPopup
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      <header className="bg-white sticky top-0 z-30 ">
        <div className="flex justify-between items-center w-full h-20 px-4 sm:px-8">
          {/* Left Icons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-1 cursor-pointer hover:border rounded-full"
            >
              <AlignJustify />
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:block p-1 cursor-pointer hover:border rounded-full"
            >
              <Search />
            </button>
          </div>

          {/* Center Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link href={"/"}>
              <Image
                src="http://zaylio.com/cdn/shop/files/IMG_7837_fdf1f912-f737-4279-bc0b-8166051a6150.jpg?v=1744288937&width=200"
                alt="Logo"
                width={160}
                height={40}
                className="h-auto"
                priority
              />
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-1 ">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="lg:hidden p-1 cursor-pointer hover:border rounded-full"
            >
              <Search />
            </button>
            <button
              onClick={() => setIsLoginOpen(true)}
              className="hidden md:block p-1 cursor-pointer hover:border rounded-full"
            >
              <UserRound />
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-1 cursor-pointer hover:border rounded-full"
            >
              <ShoppingBag />
            </button>
          </div>
        </div>

        <DesktopNav navLinks={navLinks} pathname={pathname} />
      </header>

      <style jsx global>{`
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-in forwards;
        }
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0%);
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            transform: translateY(0%);
            opacity: 1;
          }
          to {
            transform: translateY(-100%);
            opacity: 0;
          }
        }

        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out forwards;
        }
        .animate-slideOutRight {
          animation: slideOutRight 0.3s ease-in forwards;
        }
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0%);
            opacity: 1;
          }
        }
        @keyframes slideOutRight {
          from {
            transform: translateX(0%);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        .animate-fadeInScale {
          animation: fadeInScale 0.3s ease-out forwards;
        }
        .animate-fadeOutScale {
          animation: fadeOutScale 0.3s ease-in forwards;
        }
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes fadeOutScale {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.95);
          }
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.3s ease-out forwards;
        }
        .animate-slideOutLeft {
          animation: slideOutLeft 0.3s ease-in forwards;
        }
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0%);
          }
        }
        @keyframes slideOutLeft {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </>
  );
}
