"use client";
import { CheckCircle, Clock, XCircle, Eye, Check, X } from "lucide-react";
import { useMinistry } from "../_components/MinistryProvider";
import Link from "next/link";

export default function MinistryDashboard() {
  const { listings, approveListing, rejectListing } = useMinistry();

  const pendingApprovals = listings.filter((l) => l.status === "pending");
  const approvedCount = listings.filter((l) => l.status === "approved").length;
  const rejectedCount = listings.filter((l) => l.status === "rejected").length;

  const stats = [
    {
      label: "Pending Approvals",
      value: pendingApprovals.length,
      icon: Clock,
      color: "orange",
    },
    {
      label: "Approved",
      value: approvedCount,
      icon: CheckCircle,
      color: "green",
    },
    {
      label: "Rejected",
      value: rejectedCount,
      icon: XCircle,
      color: "red",
    },
  ];

  return (
    <main className="p-8 md:p-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">
          Government Admin Portal
        </h1>
        <p className="text-gray-500 font-medium text-lg">
          Review and approve land listings for marketplace verification.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          const colorStyles = {
            orange: { bg: "bg-orange-100", text: "text-orange-600" },
            green: { bg: "bg-green-100", text: "text-green-600" },
            red: { bg: "bg-red-100", text: "text-red-600" },
          };

          return (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 font-medium text-sm mb-1">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`${colorStyles[stat.color].bg} ${colorStyles[stat.color].text} p-3 rounded-xl`}
                >
                  <Icon size={28} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pending Approvals Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recent Pending Approvals</h2>
          <Link
            href="/ministry/approvals"
            className="text-blue-600 font-semibold hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="space-y-4">
          {pendingApprovals.length === 0 ? (
            <p className="text-gray-500 bg-white p-6 rounded-2xl border border-gray-200">
              No pending approvals at this time.
            </p>
          ) : (
            pendingApprovals.slice(0, 3).map((approval) => (
              <div
                key={approval.id}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left Section */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {approval.propertyTitle}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-500">
                      <p>
                        <span className="font-semibold text-gray-700">
                          Owner:
                        </span>{" "}
                        {approval.ownerName}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-700">
                          Location:
                        </span>{" "}
                        {approval.location} • {approval.acres} acres
                      </p>
                      <p>
                        <span className="font-semibold text-gray-700">
                          Documents:
                        </span>{" "}
                        {approval.documents} files uploaded
                      </p>
                      <p>
                        <span className="font-semibold text-gray-700">
                          Submitted:
                        </span>{" "}
                        {approval.submittedDate}
                      </p>
                    </div>
                  </div>

                  {/* Right Section - Actions */}
                  <div className="flex gap-3 flex-shrink-0">
                    <button className="flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold px-4 py-2 rounded-lg transition-colors text-sm">
                      <Eye size={16} />
                      Review
                    </button>
                    <button
                      onClick={() => approveListing(approval.id)}
                      className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700 font-bold px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      <Check size={16} />
                      Approve
                    </button>
                    <button
                      onClick={() => rejectListing(approval.id)}
                      className="flex items-center gap-2 bg-red-600 text-white hover:bg-red-700 font-bold px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      <X size={16} />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
