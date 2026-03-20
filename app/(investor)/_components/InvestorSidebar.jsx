"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Compass,
  Heart,
  MessageSquare,
  Calendar,
  User,
  LogOut,
} from "lucide-react";

export default function InvestorSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Clear auth data logic here (e.g. cookies, localStorage)
    document.cookie =
      "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    router.push("/login");
  };

  const navItems = [
    { name: "Dashboard", href: "/investor", icon: Home },
    { name: "Browse Listings", href: "/investor/browse", icon: Compass },
    { name: "Favorites", href: "/investor/favorites", icon: Heart },
    { name: "Appointment Responses", href: "/investor/appointments", icon: Calendar },
    { name: "Messages", href: "/investor/messages", icon: MessageSquare },
    { name: "Profile", href: "/investor/profile", icon: User },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col pt-8 px-4 flex-shrink-0">
      <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-6 px-2">
        Investor Portal
      </div>

      <nav className="space-y-2 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                isActive
                  ? "bg-[#0f0f11] text-[#9afb21]"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Icon size={20} />
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center space-x-3 text-red-600 hover:bg-red-50 px-4 py-3 rounded-xl font-semibold transition-all mb-4"
      >
        <LogOut size={20} />
        <span className="text-sm">Logout</span>
      </button>
    </aside>
  );
}
