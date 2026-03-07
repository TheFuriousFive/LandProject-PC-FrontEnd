import Link from "next/link";
import { Grid2X2, Plus } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col pt-8 px-4 flex-shrink-0">
      <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-6 px-2">
        Owner Portal
      </div>

      <nav className="space-y-2 flex-1">
        {/* My Ads */}
        <Link
          href="/owner/lists"
          className="flex items-center space-x-3 bg-[#0f0f11] text-[#9afb21] px-4 py-3 rounded-xl font-semibold hover:bg-black transition-all"
        >
          <Grid2X2 size={20} />
          <span className="text-sm">My Ads</span>
        </Link>

        {/* Add New Land */}
        <Link
          href="/owner/add-land"
          className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-3 rounded-xl font-semibold transition-all"
        >
          <Plus size={20} />
          <span className="text-sm">Add New Land</span>
        </Link>
        <Link
          href="/owner/add-land"
          className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-3 rounded-xl font-semibold transition-all"
        >
          <Plus size={20} />
          <span className="text-sm">logs</span>
        </Link>
      </nav>
    </aside>
  );
}
