"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/cartContext";
import Link from "next/link";
import Image from "next/image";
import { CreditCard, Truck, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [contactInfo, setContactInfo] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    area: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // ডিবাগিং-এর জন্য: cartItems-এ কী ডেটা আছে তা দেখার জন্য
  useEffect(() => {
    console.log("Checkout Page - Cart Items:", cartItems);
  }, [cartItems]);

  const handleContactChange = (e) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // চেক করা হচ্ছে যে প্রতিটি আইটেমের `_id` আছে কিনা
    const itemWithoutId = cartItems.find((item) => !item._id);
    if (itemWithoutId) {
      setError(
        "A product in your cart is missing necessary data. Please remove it and add it again."
      );
      console.error("This item is missing '_id':", itemWithoutId);
      return;
    }

    setIsLoading(true);
    setError(null);

    const orderDetails = {
      contactInfo,
      shippingAddress,
      paymentMethod,
      items: cartItems.map((item) => ({
        // FIX: এখানে ডাটাবেসের আসল `_id`-টি `productId` হিসেবে পাঠানো হচ্ছে
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        imageUrl: item.imageUrl,
      })),
      totalPrice,
    };

    try {
      console.log(orderDetails);
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to place order.");
      }

      // অর্ডার সফল হলে কার্ট খালি করে দিন
      clearCart();

      // ব্যবহারকারীকে একটি "thank you" পেজে রিডাইরেক্ট করুন
      router.push("/order-success");
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container mx-auto text-center py-20">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty.</h1>
        <p className="text-gray-600 mb-8">
          You need to add items to your cart before you can checkout.
        </p>
        <Link href="/all_products">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Return to Shop
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
          Checkout
        </h1>
        <form
          onSubmit={handlePlaceOrder}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
        >
          {/* Left Side: Form */}
          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-lg shadow-md">
            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={contactInfo.name}
                  onChange={handleContactChange}
                  className="w-full p-3 border rounded-md"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={contactInfo.phone}
                  onChange={handleContactChange}
                  className="w-full p-3 border rounded-md"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={contactInfo.email}
                  onChange={handleContactChange}
                  className="w-full p-3 border rounded-md"
                />
              </div>
            </section>

            {/* Shipping Address */}
            <section className="mt-8 pt-6 border-t">
              <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  name="address"
                  placeholder="Full Address (e.g., House, Road, Block)"
                  value={shippingAddress.address}
                  onChange={handleAddressChange}
                  className="w-full p-3 border rounded-md"
                  required
                />
                <input
                  type="text"
                  name="area"
                  placeholder="Area"
                  value={shippingAddress.area}
                  onChange={handleAddressChange}
                  className="w-full p-3 border rounded-md"
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={shippingAddress.city}
                  onChange={handleAddressChange}
                  className="w-full p-3 border rounded-md"
                  required
                />
              </div>
            </section>

            {/* Payment Method */}
            <section className="mt-8 pt-6 border-t">
              <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
              <div className="space-y-4">
                <label
                  className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                    paymentMethod === "cod" ? "border-blue-600 bg-blue-50" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="hidden"
                  />
                  <Truck className="w-6 h-6 mr-4 text-blue-600" />
                  <div>
                    <p className="font-bold">Cash on Delivery</p>
                    <p className="text-sm text-gray-500">
                      Pay with cash upon delivery.
                    </p>
                  </div>
                </label>
                <label
                  className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                    paymentMethod === "online"
                      ? "border-blue-600 bg-blue-50"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="hidden"
                  />
                  <CreditCard className="w-6 h-6 mr-4 text-blue-600" />
                  <div>
                    <p className="font-bold">Online Payment</p>
                    <p className="text-sm text-gray-500">
                      Pay with Bkash, Nagad, or Rocket.
                    </p>
                  </div>
                </label>
              </div>
            </section>
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-lg shadow-md sticky top-24">
            <h2 className="text-2xl font-bold border-b pb-4 mb-4">
              Order Summary
            </h2>
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden border">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute -top-2 -right-2 bg-gray-700 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <p className="font-semibold text-sm">{item.name}</p>
                  </div>
                  <p className="font-semibold">
                    ৳ {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <div className="space-y-3 mt-6 pt-4 border-t">
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

            {error && (
              <div className="mt-4 text-center text-red-600 bg-red-100 p-3 rounded-md">
                <p>Error: {error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-bold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "Placing Order..." : "Place Order"}
            </button>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
              <ShieldCheck size={16} />
              <span>Secure Payment</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
