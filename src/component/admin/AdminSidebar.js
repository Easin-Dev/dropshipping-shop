// --- src/component/admin/AdminSidebar.js ---
"use client";
import {
  LayoutDashboard,
  PackageCheck,
  ShoppingCart,
  Truck,
  CreditCard,
  Settings,
  X,
} from "lucide-react";

function SidebarLink({
  icon,
  label,
  activeTab,
  setActiveTab,
  setIsSidebarOpen,
}) {
  return (
    <a
      href="#"
      className={`flex items-center gap-3 cursor-pointer px-2 py-2 rounded-md ${
        activeTab === label
          ? "bg-blue-100 text-blue-600 font-semibold"
          : "text-gray-600 hover:text-blue-600"
      }`}
      onClick={(e) => {
        e.preventDefault();
        setActiveTab(label);
        setIsSidebarOpen(false); // Close sidebar on mobile after clicking a link
      }}
    >
      {icon}
      {label}
    </a>
  );
}

export const AdminSidebar = ({
  activeTab,
  setActiveTab,
  isSidebarOpen,
  setIsSidebarOpen,
}) => (
  <aside
    className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl p-6 flex flex-col justify-between rounded-r-2xl transform ${
      isSidebarOpen ? "translate-x-0" : "-translate-x-full"
    } lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out`}
  >
    <div>
      <div className="flex justify-between items-center mb-10">
        <div className="text-3xl font-bold flex items-center gap-2">
          <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
            <span>⏻</span>
          </div>
          <span>Admin</span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden text-gray-500 hover:text-gray-800"
        >
          <X size={24} />
        </button>
      </div>
      <nav className="flex flex-col gap-6 text-[16px]">
        <SidebarLink
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <SidebarLink
          icon={<ShoppingCart size={18} />}
          label="Order"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <SidebarLink
          icon={<PackageCheck size={18} />}
          label="Products"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <SidebarLink
          icon={<Truck size={18} />}
          label="Shipping"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <SidebarLink
          icon={<CreditCard size={18} />}
          label="Payments"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <SidebarLink
          icon={<Settings size={18} />}
          label="Settings"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </nav>
    </div>
  </aside>
);
