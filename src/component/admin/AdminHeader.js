// --- src/component/admin/AdminHeader.js ---
import { MessageSquare, Bell, Menu } from "lucide-react";

export const AdminHeader = ({ setIsSidebarOpen }) => (
  <header className="flex justify-between items-center mb-6">
    <div className="flex items-center gap-4">
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden text-gray-600"
      >
        <Menu size={24} />
      </button>
      <div>
        <h1 className="text-xl font-semibold hidden sm:block">
          Welcome Back, Admin!
        </h1>
        <p className="text-2xl sm:text-3xl font-bold">Dashboard Overview</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <button className="hidden sm:block">
        <MessageSquare size={20} />
      </button>
      <button className="hidden sm:block">
        <Bell size={20} />
      </button>
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <img src="https://i.pravatar.cc/40" alt="User" />
      </div>
    </div>
  </header>
);
