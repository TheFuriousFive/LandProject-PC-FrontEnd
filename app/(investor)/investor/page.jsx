export const metadata = {
  title: "Investor Dashboard | LandProject",
  description: "View your investor activity, key stats, and recent listings.",
};

import { Compass, FileText, Heart, MapPin, TrendingUp } from "lucide-react";
import Link from "next/link";
import BackButton from "@/_components/BackButton";

export default function InvestorDashboard() {
  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto">
      <div className="mb-6">
        <BackButton />
      </div>
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">
            Welcome back, Investor
          </h1>
          <p className="text-gray-500 font-medium text-lg">
            Here&apos;s an overview of your real estate investment portfolio.
          </p>
        </div>
        <Link
          href="/investor/browse"
          className="bg-[#0f0f11] text-[#9afb21] px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-black transition-colors"
        >
          <Compass size={20} />
          Explore Lands
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center gap-3 text-gray-500 mb-4">
            <Heart size={20} />
            <p className="font-semibold">Saved Listings</p>
          </div>
          <p className="text-4xl font-bold text-gray-900">12</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center gap-3 text-gray-500 mb-4">
            <TrendingUp size={20} />
            <p className="font-semibold">Active Offers</p>
          </div>
          <p className="text-4xl font-bold text-gray-900">2</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center gap-3 text-gray-500 mb-4">
            <FileText size={20} />
            <p className="font-semibold">Contracts</p>
          </div>
          <p className="text-4xl font-bold text-gray-900">0</p>
        </div>
        <div className="bg-[#9afb21] p-6 rounded-2xl shadow-sm border border-[#8bed1c] flex flex-col justify-between">
          <div className="flex items-center gap-3 text-[#0f0f11] mb-4">
            <MapPin size={20} />
            <p className="font-semibold">Avg. Price / Acre</p>
          </div>
          <p className="text-4xl font-bold text-[#0f0f11]">$4,250</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                  <img
                    src={`https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=200&auto=format&fit=crop&${i}`}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    Premium Agriculture Land {i}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">
                    Des Moines, Iowa • 120 Acres
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                <div className="text-left sm:text-right">
                  <p className="font-bold text-gray-900 text-lg">$240,000</p>
                  <p className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded inline-block mt-1">
                    Under Review
                  </p>
                </div>
                <Link
                  href={`/property/${i}`}
                  className="bg-white border border-gray-200 text-sm font-bold px-4 py-2 rounded-lg hover:border-gray-900 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
