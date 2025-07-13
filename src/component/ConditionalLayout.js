"use client";

import { usePathname } from "next/navigation";
import Header from "@/component/HeaderAllFile/Header";
import Footer from "@/component/HeaderAllFile/Footer";

export default function ConditionalLayout({ children }) {
  // বর্তমান URL পাথ পাওয়ার জন্য usePathname hook ব্যবহার করা হচ্ছে
  const pathname = usePathname();

  // চেক করা হচ্ছে যে পাথটি '/admin' দিয়ে শুরু হচ্ছে কিনা
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {/* যদি অ্যাডমিন রুট না হয়, তাহলে Header দেখাও */}
      {!isAdminRoute && <Header />}

      <main className="flex-grow">{children}</main>

      {/* যদি অ্যাডমিন রুট না হয়, তাহলে Footer দেখাও */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}
