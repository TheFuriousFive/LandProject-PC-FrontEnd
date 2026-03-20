"use client";

import Link from "next/link";
import {
  Edit2,
  FileText,
  ChevronLeft,
  Share2,
  Shield,
  CheckCircle,
  Save,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function PropertyPageHeader({ role, property }) {
  const router = useRouter();

  if (role === "owner") {
    return (
      <div className="bg-white border-b border-gray-200 mb-6">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/owner/lists")}
              className="text-gray-500 hover:text-gray-900 transition-colors flex items-center text-sm font-semibold"
            >
              <ChevronLeft size={16} className="mr-1" /> My Listings
            </button>
            <div className="h-4 w-px bg-gray-300 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-500 uppercase">
                Status:
              </span>
              {property.status === "approved" ? (
                <span className="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded-md uppercase">
                  Approved
                </span>
              ) : (
                <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2.5 py-1 rounded-md uppercase">
                  Pending
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <FileText size={16} /> Manage Documents
            </button>
            <button onClick={() => router.push("/owner/lists")} className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-[#0f0f11] hover:bg-black rounded-lg transition-colors">
              <Edit2 size={16} /> Edit Listing
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default to investor / public view
  return (
    <div className="bg-white border-b border-gray-200 mb-6">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-gray-500">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <span className="text-gray-300">/</span>
          <Link
            href="/investor/browse"
            className="hover:text-gray-900 transition-colors"
          >
            Browse
          </Link>
          <span className="text-gray-300">/</span>
          <span className="hover:text-gray-900 transition-colors truncate max-w-[120px] sm:max-w-xs">
            {typeof property.location === 'object' 
              ? `${property.location.city}, ${property.location.state}` 
              : property.location}
          </span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-bold truncate max-w-[120px] sm:max-w-xs">
            {property.title}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
          {/* Trust Badges */}
          <div className="hidden sm:flex items-center gap-2 mr-2">
            <div className="flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-1 rounded-md">
              <Shield size={14} /> Verified Listing
            </div>
            {property.documents?.length > 0 && (
              <div className="flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-1 rounded-md">
                <CheckCircle size={14} /> Docs Complete
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <button className="flex-1 md:flex-none flex justify-center items-center gap-2 px-4 py-2 text-sm font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors">
            <Share2 size={16} /> Share
          </button>
          <button className="flex-1 md:flex-none flex justify-center items-center gap-2 px-4 py-2 text-sm font-bold text-[#9afb21] bg-[#0f0f11] hover:bg-black rounded-lg transition-colors shadow-sm">
            <Save size={16} /> Save to Watchlist
          </button>
        </div>
      </div>
    </div>
  );
}


