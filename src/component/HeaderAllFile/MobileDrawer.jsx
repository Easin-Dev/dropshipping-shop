"use client";

import { useState } from 'react';
import Link from 'next/link';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

export default function MobileDrawer({ isOpen, onClose, navLinks, pathname }) {
  const [openMobileMenu, setOpenMobileMenu] = useState('');
  
  const [isClosing, setIsClosing] = useState(false);

  const toggleMobileMenu = (menuName) => {
    setOpenMobileMenu(openMobileMenu === menuName ? '' : menuName);
  };

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
      <div className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 lg:hidden" onClick={handleClose}></div>
      
      <div
        className={`fixed top-0 left-0 h-full overflow-y-auto bg-white z-50 lg:hidden w-full sm:w-[350px] p-4 ${
          isClosing ? 'animate-slideOutLeft' : 'animate-slideInLeft'
        }`}
      >
        <div className="flex justify-end mb-4">
          <button className="text-red hover:border rounded-full p-1 cursor-pointer" onClick={handleClose}>
            <X size={24} />
          </button>
        </div>
          <div className='divider'></div>
        <nav className="flex flex-col space-y-1">
          {navLinks.map((link) => {
            const isActive = link.subLinks ? pathname.startsWith(link.href) : pathname === link.href;
            if (link.subLinks) {
              return (
                <div key={link.name}>
                  <button onClick={() => toggleMobileMenu(link.name)} className={`w-full flex justify-between items-center text-left p-3 rounded-md font-semibold transition-colors ${isActive ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100 text-gray-700'}`}>
                    <span>{link.name}</span>
                    {openMobileMenu === link.name ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {openMobileMenu === link.name && (
                    <div className="pl-6 pt-2 pb-1 flex flex-col items-start space-y-1">
                      {link.subLinks.map(subLink => (
                        <Link key={subLink.name} href={subLink.href} className={`w-full block p-2 rounded-md text-sm transition-colors ${pathname === subLink.href ? 'text-blue-600 font-bold' : 'text-gray-600 hover:text-blue-600'}`}>
                          {subLink.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link key={link.name} href={link.href} className={`w-full block text-left p-3 rounded-md font-semibold transition-colors ${isActive ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100 text-gray-700'}`}>
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}