"use client";

import { useCart } from "@/context/cartContext";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";

export default function AddCartPage() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto text-center py-20">
        <ShoppingBag size={80} className="text-gray-300 mb-4 mx-auto" />
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <Link href="/all_products">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold text-center mb-10">
          Your Shopping Cart
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-4 border-b pb-6 last:border-b-0"
              >
                <div className="relative w-full sm:w-32 h-32 sm:h-auto flex-shrink-0 rounded-md overflow-hidden border">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow flex flex-col">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg pr-2">{item.name}</h3>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 hover:border rounded-full cursor-pointer"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">{item.vendor}</p>
                  <div className="flex items-center justify-between mt-auto pt-4">
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-3 py-2"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 text-md font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-3 py-2"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <p className="font-bold text-xl">
                      ৳ {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md sticky top-24">
            <h2 className="text-2xl font-bold border-b pb-4 mb-4">
              Order Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>৳ {totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
            </div>
            <div className="flex justify-between font-extrabold text-xl mt-6 pt-4 border-t">
              <span>Total</span>
              <span>৳ {totalPrice.toLocaleString()}</span>
            </div>
            <Link href="/checkout">
              <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-bold text-lg cursor-pointer">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
