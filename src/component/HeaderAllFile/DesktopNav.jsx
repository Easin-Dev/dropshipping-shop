"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export default function DesktopNav({ navLinks, pathname }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const getLinkClassName = (href, isDropdown = false) => {
    const isActive = isDropdown ? pathname.startsWith(href) : pathname === href;
    const baseStyle = 'py-4 font-semibold border-b-2 transition-colors duration-300';
    const activeStyle = 'text-blue-600 border-blue-600';
    const inactiveStyle = 'text-gray-800 border-transparent hover:text-blue-600';
    return `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`;
  };

  return (
    <div className="hidden lg:flex w-full justify-center border-t border-gray-200 shadow-sm">
      <nav className="flex items-center space-x-10">
        {navLinks.map((link) => (
          <div key={link.name} className="relative" onMouseEnter={() => link.subLinks && setOpenDropdown(link.name)} onMouseLeave={() => link.subLinks && setOpenDropdown(null)}>
            <Link href={link.href} className={`${getLinkClassName(link.href, !!link.subLinks)} flex items-center cursor-pointer`}>
              {link.name}
              {link.subLinks && <ChevronDown size={16} className="ml-1" />}
            </Link>
            {link.subLinks && openDropdown === link.name && (
              <div className="absolute top-full left-0 w-56 bg-white rounded-md shadow-lg z-20 py-2">
                {link.subLinks.map((subLink) => (
                  <Link key={subLink.name} href={subLink.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {subLink.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}