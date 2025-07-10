"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cartContext"; // Cart context import korun

export default function CartDrawer({ isOpen, onClose }) {
  const [isClosing, setIsClosing] = useState(false);
  // Context theke cart er shob state o function nin
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        onClick={handleClose}
      ></div>
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-lg flex flex-col ${
          isClosing ? "animate-slideOutRight" : "animate-slideInRight"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Shopping Cart</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-red-500 p-1 hover:border rounded-full cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
            <ShoppingBag size={60} className="text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700">
              Your cart is empty
            </h3>
            <p className="text-gray-500">
              Looks like you haven't added anything yet.
            </p>

            <Link href="/all_products">
              <button
                onClick={handleClose}
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-24 h-24 rounded-md overflow-hidden border">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow flex flex-col">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-sm pr-2">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 flex-shrink-0 hover:border rounded-full cursor-pointer"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">{item.vendor}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center border rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-1"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-sm font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-1"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="font-bold text-md">
                        ৳ {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t space-y-4 bg-gray-50">
              <div className="flex justify-between font-bold text-lg">
                <span>Subtotal</span>
                <span>৳ {totalPrice.toLocaleString()}</span>
              </div>
              <p className="text-xs text-gray-500 text-center">
                Shipping and taxes calculated at checkout.
              </p>
              <Link href="/add_cart">
                <button
                  onClick={handleClose}
                  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-bold cursor-pointer"
                >
                  View Cart & Checkout
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
