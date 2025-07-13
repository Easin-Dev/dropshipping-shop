"use client";

import Link from "next/link";
import { CheckCircle, ShoppingBag, Package } from "lucide-react";
import { useEffect } from "react";

export default function OrderSuccessPage() {
  // Optional: Add confetti effect for celebration
  useEffect(() => {
    console.log("Order success page loaded!");
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 md:p-12 rounded-xl shadow-lg text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">
          Thank You!
        </h1>

        <p className="text-gray-600 mb-8">
          Your order has been placed successfully. We've sent a confirmation
          email to you.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-blue-800">
            {/* Ekhane apni bastob Order ID dekhate paren */}
            Your Order ID is: <span className="font-bold">#12345-ABCDE</span>
            <br />
            You can use this ID to track your order status.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/all_products" className="w-full">
            <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
              <ShoppingBag size={20} />
              Continue Shopping
            </button>
          </Link>
          <Link href="/user/orders" className="w-full">
            <button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors border">
              <Package size={20} />
              Track Your Order
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
