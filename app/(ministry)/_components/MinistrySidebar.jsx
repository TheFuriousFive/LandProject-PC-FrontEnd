"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/_components/LogoutButton";
import {
  Home,
  CheckCircle,
  Clock,
  BarChart3,
  Users,
  Settings,
} from "lucide-react";

export default function MinistrySidebar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/ministry", label: "Dashboard", icon: Home },
    { href: "/ministry/approvals", label: "Pending Approvals", icon: Clock },
    {
      href: "/ministry/approved",
      label: "Approved Listings",
      icon: CheckCircle,
    },
    { href: "/ministry/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/ministry/users", label: "User Management", icon: Users },
    { href: "/ministry/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col pt-8 px-4 shrink-0">
      <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-6 px-2">
        Ministry Admin
      </div>

      <nav className="space-y-2 flex-1">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive =
            pathname === link.href ||
            (pathname.startsWith(link.href) && link.href !== "/ministry");

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
