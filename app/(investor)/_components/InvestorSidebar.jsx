import Link from "next/link";
import {
  Home,
  Compass,
  Heart,
  MessageSquare,
  User,
  LogOut,
} from "lucide-react";

export default function InvestorSidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col pt-8 px-4 flex-shrink-0">
      <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-6 px-2">
        Investor Portal
      </div>

      <nav className="space-y-2 flex-1">
        {/* Dashboard */}
        <Link
          href="/investor"
          className="flex items-center space-x-3 bg-[#0f0f11] text-[#9afb21] px-4 py-3 rounded-xl font-semibold hover:bg-black transition-all"
        >
          <Home size={20} />
          <span className="text-sm">Dashboard</span>
        </Link>

        {/* Browse Listings */}
        <Link
          href="/investor/browse"
          className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-3 rounded-xl font-semibold transition-all"
        >
          <Compass size={20} />
          <span className="text-sm">Browse Listings</span>
        </Link>

        {/* Favorites */}
        <Link
          href="/investor/favorites"
          className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-3 rounded-xl font-semibold transition-all"
        >
          <Heart size={20} />
          <span className="text-sm">Favorites</span>
        </Link>

        {/* Messages */}
        <Link
          href="/investor/messages"
          className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-3 rounded-xl font-semibold transition-all"
        >
          <MessageSquare size={20} />
          <span className="text-sm">Messages</span>
        </Link>

        {/* Profile */}
        <Link
          href="/investor/profile"
          className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-3 rounded-xl font-semibold transition-all"
        >
          <User size={20} />
          <span className="text-sm">Profile</span>
        </Link>
      </nav>

      {/* Logout Button */}
      <button className="w-full flex items-center space-x-3 text-red-600 hover:bg-red-50 px-4 py-3 rounded-xl font-semibold transition-all mb-4">
        <LogOut size={20} />
        <span className="text-sm">Logout</span>
      </button>
    </aside>
  );
}
