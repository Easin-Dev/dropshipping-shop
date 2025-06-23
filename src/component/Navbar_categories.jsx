"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

// ডেটা আগের মতোই থাকবে
const allCategories = [
    { name: 'Mobile Essentials', href: '/collections/mobile-essentials' },
    { name: 'Audio Zone', href: '/collections/audio' },
    { name: 'Smart Home Devices', href: '/collections/smart-home' },
    { name: 'Computer Accessories', href: '/collections/computer-accessories' },
    { name: 'Wearables & Fitness', href: '/collections/wearables' },
    { name: 'Gaming Gear', href: '/collections/gaming-gear' },
];

const offerDeals = [
    { name: 'Flash Sale', href: '/deals/flash-sale' },
    { name: 'Bundle & Save', href: '/deals/bundle-save' },
    { name: 'Clearance', href: '/deals/clearance' },
];

export default function NavbarCategories() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const pathname = usePathname();

  const getLinkClassName = (href, isDropdown = false) => {
    const isActive = isDropdown ? pathname.startsWith(href) : pathname === href;
    const baseStyle = 'py-4 font-semibold border-b-2 transition-colors duration-300';
    const activeStyle = 'text-blue-600 border-blue-600';
    const inactiveStyle = 'text-gray-800 border-transparent hover:text-blue-600';
    return `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`;
  };

  return (
    // এই র‍্যাপারটি যোগ করা হয়েছে। এটি lg (1024px) স্ক্রিনের নিচে পুরো কম্পোনেন্টটিকে হাইড করে দেবে।
    <div className="hidden lg:block">
      <div className="bg-white w-full flex justify-center border-b border-gray-200 shadow-sm">
        <nav className="flex items-center space-x-10">
            {/* ভেতরের কোড সব আগের মতোই থাকবে */}
            <Link href="/" className={getLinkClassName('/')}>
                Home
            </Link>
            
            <Link href="/collections/new-arrivals" className={getLinkClassName('/collections/new-arrivals')}>
                New Arrivals
            </Link>

            <div 
                className="relative"
                onMouseEnter={() => setOpenDropdown('categories')}
                onMouseLeave={() => setOpenDropdown(null)}
            >
                <Link
                    href="/collections"
                    className={`${getLinkClassName('/collections', true)} flex items-center cursor-pointer`}
                >
                    All Categories
                    <ChevronDown size={16} className={`ml-1 transition-transform ${openDropdown === 'categories' ? 'rotate-180' : ''}`} />
                </Link>

                {openDropdown === 'categories' && (
                    <div className="absolute top-full left-0 w-56 bg-white rounded-md shadow-lg z-20 py-2">
                    {allCategories.map((item) => (
                        <Link key={item.name} href={item.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        {item.name}
                        </Link>
                    ))}
                    </div>
                )}
            </div>

            <Link href="/collections/best-seller" className={getLinkClassName('/collections/best-seller')}>
                Best Sellers
            </Link>
            
            <div 
                className="relative"
                onMouseEnter={() => setOpenDropdown('deals')}
                onMouseLeave={() => setOpenDropdown(null)}
            >
                <Link
                    href="/deals"
                    className={`${getLinkClassName('/deals', true)} flex items-center cursor-pointer`}
                >
                    Deals
                    <ChevronDown size={16} className={`ml-1 transition-transform ${openDropdown === 'deals' ? 'rotate-180' : ''}`} />
                </Link>

                {openDropdown === 'deals' && (
                    <div className="absolute top-full left-0 w-56 bg-white rounded-md shadow-lg z-20 py-2">
                    {offerDeals.map((item) => (
                        <Link key={item.name} href={item.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        {item.name}
                        </Link>
                    ))}
                    </div>
                )}
            </div>

            <Link href="/track-order" className={getLinkClassName('/track-order')}>
                Track Your Order
            </Link>
        </nav>
      </div>
    </div>
  );
}