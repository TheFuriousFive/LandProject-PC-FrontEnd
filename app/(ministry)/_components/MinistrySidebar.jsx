import Link from "next/link";
import {
  Home,
  CheckCircle,
  Clock,
  BarChart3,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

export default function MinistrySidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col pt-8 px-4 flex-shrink-0">
      <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-6 px-2">
        Ministry Admin
      </div>

      <nav className="space-y-2 flex-1">
        {/* Dashboard */}
        <Link
          href="/ministry"
          className="flex items-center space-x-3 bg-[#0f0f11] text-[#9afb21] px-4 py-3 rounded-xl font-semibold hover:bg-black transition-all"
        >
          <Home size={20} />
          <span className="text-sm">Dashboard</span>
        </Link>

        {/* Pending Approvals */}
        <Link
          href="/ministry/approvals"
          className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-3 rounded-xl font-semibold transition-all"
        >
          <Clock size={20} />
          <span className="text-sm">Pending Approvals</span>
        </Link>

        {/* Approved Listings */}
        <Link
          href="/ministry/approved"
          className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-3 rounded-xl font-semibold transition-all"
        >
          <CheckCircle size={20} />
          <span className="text-sm">Approved Listings</span>
        </Link>

        {/* Analytics */}
        <Link
          href="/ministry/analytics"
          className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-3 rounded-xl font-semibold transition-all"
        >
          <BarChart3 size={20} />
          <span className="text-sm">Analytics</span>
        </Link>

        {/* User Management */}
        <Link
          href="/ministry/users"
          className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-3 rounded-xl font-semibold transition-all"
        >
          <Users size={20} />
          <span className="text-sm">User Management</span>
        </Link>

        {/* Settings */}
        <Link
          href="/ministry/settings"
          className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-3 rounded-xl font-semibold transition-all"
        >
          <Settings size={20} />
          <span className="text-sm">Settings</span>
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
