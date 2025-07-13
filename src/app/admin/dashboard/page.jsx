"use client";

import { useState } from "react";
// নতুন কম্পোনেন্টগুলো ইম্পোর্ট করা হচ্ছে
import { AdminSidebar } from "@/component/admin/AdminSidebar";
import { AdminHeader } from "@/component/admin/AdminHeader";
import { DashboardContent } from "@/component/admin/DashboardContent";
import { OrderContent } from "@/component/admin/OrderContent";

// অন্যান্য ট্যাবগুলোর জন্য প্লেসহোল্ডার কম্পোনেন্ট
// ভবিষ্যতে আপনি এগুলোকে OrderContent-এর মতো ডায়নামিক করতে পারবেন
const ProductsContent = () => (
  <div className="bg-white p-6 rounded-xl shadow-md">
    Products Management Section
  </div>
);
const ShippingContent = () => (
  <div className="bg-white p-6 rounded-xl shadow-md">
    Shipping Management Section
  </div>
);
const PaymentsContent = () => (
  <div className="bg-white p-6 rounded-xl shadow-md">
    Payments Management Section
  </div>
);
const SettingsContent = () => (
  <div className="bg-white p-6 rounded-xl shadow-md">Settings Section</div>
);

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // কোন ট্যাব فعال আছে তার উপর ভিত্তি করে সঠিক কম্পোনেন্ট দেখানোর জন্য একটি ফাংশন
  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <DashboardContent />;
      case "Order":
        return <OrderContent />;
      case "Products":
        return <ProductsContent />;
      case "Shipping":
        return <ShippingContent />;
      case "Payments":
        return <PaymentsContent />;
      case "Settings":
        return <SettingsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f5f7fa] text-gray-800">
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* ছোট স্ক্রিনের জন্য সাইডবার খোলার সময় একটি আবছা ওভারলে */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* মূল কন্টেন্ট */}
      <main className="flex-1 p-4 sm:p-6">
        <AdminHeader setIsSidebarOpen={setIsSidebarOpen} />
        <div className="transition-all duration-300">{renderContent()}</div>
      </main>
    </div>
  );
}
