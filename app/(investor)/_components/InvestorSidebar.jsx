"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/_components/LogoutButton";
import {
  Home,
  Compass,
  Heart,
  MessageSquare,
  User
} from "lucide-react";

export default function InvestorSidebar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/investor", label: "Dashboard", icon: Home },
    { href: "/investor/browse", label: "Browse Listings", icon: Compass },
    { href: "/investor/favorites", label: "Favorites", icon: Heart },
    { href: "/investor/messages", label: "Messages", icon: MessageSquare },
    { href: "/investor/profile", label: "Profile", icon: User },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col pt-8 px-4 shrink-0">
      <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-6 px-2">
        Investor Portal
      </div>

      <nav className="space-y-2 flex-1">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/investor');
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                isActive
                  ? "bg-[#0f0f11] text-[#9afb21] hover:bg-black shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Icon size={20} />
              <span className="text-sm">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="mb-4">
        <LogoutButton />
      </div>
    </aside>
  );
}
