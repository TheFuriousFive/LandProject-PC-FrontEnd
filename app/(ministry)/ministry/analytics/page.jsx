"use client";
import { BarChart3, TrendingUp, Users, Activity } from "lucide-react";
import { useMinistry } from "../../_components/MinistryProvider";

export default function Analytics() {
  const { listings, users } = useMinistry();

  const totalListings = listings.length;
  const approvalRate =
    totalListings > 0
      ? Math.round(
          (listings.filter((l) => l.status === "approved").length /
            totalListings) *
            100,
        )
      : 0;

  const ownerCount = users.filter((u) => u.role === "owner").length;
  const investorCount = users.filter((u) => u.role === "investor").length;

  return (
    <main className="p-8 md:p-12 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">
          Platform Analytics
        </h1>
        <p className="text-gray-500 font-medium text-lg">
          Insights into platform usage, listing statistics, and user growth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <BarChart3 size={24} />
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
              +12%
            </span>
          </div>
          <h3 className="text-gray-500 font-medium text-sm mb-1">
            Total Submissions
          </h3>
          <p className="text-3xl font-bold text-gray-900">{totalListings}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-xl">
              <TrendingUp size={24} />
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
              +5%
            </span>
          </div>
          <h3 className="text-gray-500 font-medium text-sm mb-1">
            Approval Rate
          </h3>
          <p className="text-3xl font-bold text-gray-900">{approvalRate}%</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <Users size={24} />
            </div>
          </div>
          <h3 className="text-gray-500 font-medium text-sm mb-1">
            Registered Owners
          </h3>
          <p className="text-3xl font-bold text-gray-900">{ownerCount}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
              <Activity size={24} />
            </div>
          </div>
          <h3 className="text-gray-500 font-medium text-sm mb-1">
            Active Investors
          </h3>
          <p className="text-3xl font-bold text-gray-900">{investorCount}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Submissions over Time (Mock)
          </h3>
          <div className="h-64 flex items-end justify-between gap-2 max-w-full overflow-hidden">
            {[40, 65, 45, 80, 55, 90, 75].map((height, i) => (
              <div
                key={i}
                className="w-1/6 flex flex-col items-center gap-2 group"
              >
                <div
                  className="w-full bg-[#0f0f11] rounded-t-sm group-hover:bg-[#9afb21] transition-colors"
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-xs text-gray-500">M{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Listing Dispositions
          </h3>
          <div className="flex flex-col justify-center gap-6 mt-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span className="text-gray-700 font-medium">Approved</span>
              </div>
              <span className="font-bold text-gray-900">
                {listings.filter((l) => l.status === "approved").length}{" "}
                properties
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span className="text-gray-700 font-medium">Rejected</span>
              </div>
              <span className="font-bold text-gray-900">
                {listings.filter((l) => l.status === "rejected").length}{" "}
                properties
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                <span className="text-gray-700 font-medium">
                  Pending Review
                </span>
              </div>
              <span className="font-bold text-gray-900">
                {listings.filter((l) => l.status === "pending").length}{" "}
                properties
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
