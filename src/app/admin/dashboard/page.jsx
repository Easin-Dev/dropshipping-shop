"use client"
import {
  LayoutDashboard,
  PackageCheck,
  ShoppingCart,
  Truck,
  CreditCard,
  Settings,
  MessageSquare,
  Bell,
  UserCircle,
} from "lucide-react";
import { useState } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="flex min-h-screen bg-[#f5f7fa] text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl p-6 flex flex-col justify-between rounded-r-2xl">
        <div>
          <div className="text-3xl font-bold mb-10">
            <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
              <span>⏻</span>
            </div>
          </div>

          <nav className="flex flex-col gap-6 text-[16px]">
            <SidebarLink icon={<LayoutDashboard size={18} />} label="Dashboard" activeTab={activeTab} setActiveTab={setActiveTab} />
            <SidebarLink icon={<ShoppingCart size={18} />} label="Order" activeTab={activeTab} setActiveTab={setActiveTab} />
            <SidebarLink icon={<PackageCheck size={18} />} label="Products" activeTab={activeTab} setActiveTab={setActiveTab} />
            <SidebarLink icon={<Truck size={18} />} label="Shipping" activeTab={activeTab} setActiveTab={setActiveTab} />
            <SidebarLink icon={<CreditCard size={18} />} label="Payments" activeTab={activeTab} setActiveTab={setActiveTab} />
            <SidebarLink icon={<Settings size={18} />} label="Settings" activeTab={activeTab} setActiveTab={setActiveTab} />
          </nav>
        </div>

        <div className="mt-10">
          <div className="text-sm text-gray-500 mb-3">Customer Support</div>
          <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md text-sm font-medium">
            Connect Now
          </button>

          <p className="mt-4 text-xs text-gray-400">Terms & Services <br /> Privacy Policy</p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {activeTab === "Dashboard" && (
          <>
            <header className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-xl font-semibold">Total Revenue</h1>
                <p className="text-3xl font-bold">$45,365.00 <span className="text-red-500 text-sm">▼ $1,294</span> <span className="text-green-500 text-sm">▲ $1,294</span></p>
              </div>
              <div className="flex items-center gap-4">
                <button><MessageSquare size={20} /></button>
                <button><Bell size={20} /></button>
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src="https://i.pravatar.cc/40" alt="User" />
                </div>
              </div>
            </header>

            <div className="grid grid-cols-3 gap-6 mb-6">
              <StatCard color="bg-blue-500" label="Shipped orders" value="67" />
              <StatCard color="bg-rose-500" label="Pending orders" value="09" />
              <StatCard color="bg-purple-500" label="New orders" value="35" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-xl shadow">
                <div className="font-semibold text-gray-800 mb-2">Inbox</div>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex justify-between border-b pb-1">
                    <span>Waiting for order#12345</span>
                    <span className="text-gray-400 text-xs">4:39</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Customer support id#22234</span>
                    <span className="text-gray-400 text-xs">11:07</span>
                  </li>
                </ul>
                <div className="text-right mt-2">
                  <button className="text-sm text-blue-600 font-medium hover:underline">View details</button>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow">
                <div className="font-semibold text-gray-800 mb-2">Today's trends</div>
                <img src="https://dummyimage.com/400x200/cccccc/000000&text=Chart" alt="Chart" className="rounded-md" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow mt-6">
              <div className="font-semibold text-gray-800 mb-2 flex justify-between">
                Recent Activity
                <button className="text-sm text-blue-600 font-medium hover:underline">View all</button>
              </div>
              <ul className="space-y-3 text-sm">
                <ActivityItem label="Confirm order update" status="URGENT" color="blue" />
                <ActivityItem label="Finish shipping update" status="URGENT" color="red" />
                <ActivityItem label="Create new order" status="NEW" color="green" />
                <ActivityItem label="Update payment report" status="DEFAULT" color="gray" />
              </ul>
            </div>
          </>
        )}

        {activeTab === "Order" && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Page</h2>
            <p>This is the order management section.</p>
          </div>
        )}

        {activeTab === "Products" && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Products Page</h2>
            <p>This is the product management section.</p>
          </div>
        )}

        {activeTab === "Shipping" && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Shipping Page</h2>
            <p>This is the shipping management section.</p>
          </div>
        )}

        {activeTab === "Payments" && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Payments Page</h2>
            <p>This is the payments management section.</p>
          </div>
        )}

        {activeTab === "Settings" && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Settings Page</h2>
            <p>This is the settings section.</p>
          </div>
        )}
      </main>
    </div>
  );
}

function SidebarLink({ icon, label, activeTab, setActiveTab }) {
  return (
    <div
      className={`flex items-center gap-3 cursor-pointer px-2 py-2 rounded-md ${
        activeTab === label ? "bg-blue-100 text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"
      }`}
      onClick={() => setActiveTab(label)}
    >
      {icon}
      {label}
    </div>
  );
}

function StatCard({ color, label, value }) {
  return (
    <div className={`p-6 rounded-xl text-white shadow-md ${color}`}>
      <div className="text-lg font-medium">{label}</div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
}

function ActivityItem({ label, status, color }) {
  const statusColors = {
    blue: "bg-blue-500",
    red: "bg-red-500",
    green: "bg-green-500",
    gray: "bg-gray-400",
  };

  return (
    <li className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className={`w-3 h-3 rounded-full ${statusColors[color]}`}></span>
        {label}
      </div>
      <span className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600 font-medium">
        {status}
      </span>
    </li>
  );
}
