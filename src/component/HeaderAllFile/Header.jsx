"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  UserCircle,
  PackageCheck,
  Heart,
  Star,
  RotateCcw,
  LayoutDashboard,
  Boxes,
  LogOut,
  AlignJustify,
  Search,
  ShoppingBag,
  UserRound,
} from "lucide-react";

import { useSession, signOut } from "next-auth/react";

import { useCart } from "../../context/cartContext";
import { navLinks } from "../../data/navigation";
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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { data: session, status } = useSession();
  const userMenuRef = useRef();

  const { cartCount } = useCart();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  // Outside click দিলে মেনু hide করার logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


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

      {/* LoginModal শুধুমাত্র তখনই রেন্ডার হবে যখন isLoginOpen true হবে */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      <header className="bg-white sticky top-0 z-30 shadow-sm">
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
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="lg:hidden p-1 cursor-pointer hover:border rounded-full"
            >
              <Search />
            </button>

            {/* --- Login/Logout Button Logic --- */}
            <div
              className="hidden md:flex items-center gap-2 relative"
              ref={userMenuRef}
            >
              {status === "loading" ? (
                <div className="h-8 w-24 bg-gray-200 rounded-md animate-pulse"></div>
              ) : session ? (
                <div className="relative hover:border rounded-l-full rounded-r-full">
                  {/* Toggle Dropdown */}
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="p-2 cursor-pointer hover:bg-gray-100 rounded-full flex items-center gap-1"
                  >
                    <UserRound size={20} />
                    <span className="text-sm font-semibold">
                      Hi, {session.user.name?.split(" ")[0]}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white shadow-xl rounded-xl border border-gray-200 z-50 overflow-hidden">
                      <ul className="divide-y divide-gray-100">
                        <li>
                          <Link
                            href="/account"
                            className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-gray-100 transition"
                          >
                            <UserCircle size={18} /> Manage My Account
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/orders"
                            className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-gray-100 transition"
                          >
                            <PackageCheck size={18} /> My Orders
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/wishlist"
                            className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-gray-100 transition"
                          >
                            <Heart size={18} /> My Wishlist & Followed Stores
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/reviews"
                            className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-gray-100 transition"
                          >
                            <Star size={18} /> My Reviews
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/returns"
                            className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-gray-100 transition"
                          >
                            <RotateCcw size={18} /> My Returns & Cancellations
                          </Link>
                        </li>

                        {/* Admin-specific options */}
                        {session.user.userRole === "admin" && (
                          <>
                            <li>
                              <Link
                                href="/admin/dashboard"
                                className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-gray-100 transition"
                              >
                                <LayoutDashboard size={18} /> Admin Dashboard
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/admin/products"
                                className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-gray-100 transition"
                              >
                                <Boxes size={18} /> Manage Products
                              </Link>
                            </li>
                          </>
                        )}

                        <li>
                          <button
                            onClick={handleSignOut}
                            className="flex items-center gap-3 w-full text-left px-5 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition"
                          >
                            <LogOut size={18} /> Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="p-1 cursor-pointer hover:border rounded-full"
                >
                  <UserRound />
                </button>
              )}
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="p-1 cursor-pointer hover:border rounded-full relative"
            >
              <ShoppingBag />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                  {cartCount}
                </span>
              )}
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
