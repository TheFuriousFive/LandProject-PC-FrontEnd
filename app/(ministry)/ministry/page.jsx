"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  Clock,
  XCircle,
  FileText,
  ArrowRight,
} from "lucide-react";

export default function MinistryDashboard() {
  const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0 });
  const [recentApprovals, setRecentApprovals] = useState([]);

  useEffect(() => {
    const listings = JSON.parse(localStorage.getItem("land_listings") || "[]");

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStats({
      pending: listings.filter((l) => l.status === "pending").length,
      approved: listings.filter((l) => l.status === "approved").length,
      rejected: listings.filter((l) => l.status === "rejected").length,
    });

    setRecentApprovals(
      listings.filter((l) => l.status === "pending").slice(0, 3),
    );
  }, []);

  const statCards = [
    {
      label: "Pending Approvals",
      value: stats.pending,
      icon: Clock,
      color: "orange",
      bg: "bg-orange-50",
      text: "text-orange-600",
    },
    {
      label: "Approved Listings",
      value: stats.approved,
      icon: CheckCircle,
      color: "green",
      bg: "bg-green-50",
      text: "text-green-600",
    },
    {
      label: "Rejected Listings",
      value: stats.rejected,
      icon: XCircle,
      color: "red",
      bg: "bg-red-50",
      text: "text-red-600",
    },
  ];

  return (
    <main className="p-8 md:p-12 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">
          Ministry Dashboard
        </h1>
        <p className="text-gray-500 font-medium text-lg">
          Overview of platform activity, listings, and pending review queue.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 font-bold tracking-tight text-sm mb-1 uppercase">
                    {stat.label}
                  </p>
                  <p className="text-4xl font-extrabold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.bg} ${stat.text} p-4 rounded-2xl`}>
                  <Icon size={32} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Access to Pending Approvals */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
            <Clock className="text-orange-500" /> Pending Review
          </h2>
          <Link
            href="/ministry/approvals"
            className="text-blue-600 font-bold hover:text-blue-700 flex items-center text-sm"
          >
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        {recentApprovals.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <CheckCircle className="mx-auto text-green-500 mb-3" size={40} />
            <p className="font-bold text-lg text-gray-900">All caught up!</p>
            <p>There are no pending listings to review right now.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentApprovals.map((approval) => (
              <div
                key={approval.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
              >
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                  <div className="bg-white p-3 rounded-lg border border-gray-200 text-gray-400">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {approval.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {approval.location} • {approval.acres} acres •{" "}
                      {approval.price}
                    </p>
                  </div>
                </div>
                <Link
                  href="/ministry/approvals"
                  className="bg-white border border-gray-200 text-gray-900 px-4 py-2 hover:bg-gray-50 font-bold rounded-lg text-sm transition-colors shadow-sm whitespace-nowrap text-center"
                >
                  Review Submission
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
