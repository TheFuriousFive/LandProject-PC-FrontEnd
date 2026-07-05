"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  CheckCircle,
  Clock,
  XCircle,
  FileText,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const REFRESH_INTERVAL_MS = 15000; // poll every 15s for near real-time updates

export default function MinistryDashboard() {
  const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0 });
  const [recentApprovals, setRecentApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const normalizeStatus = useCallback(
    (listing) => String(listing?.verificationStatus || "").toLowerCase(),
    [],
  );

  const isPendingReview = useCallback(
    (listing) => ["pending_verification"].includes(normalizeStatus(listing)),
    [normalizeStatus],
  );

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchDashboardListings = async (isInitialLoad) => {
      try {
        if (isInitialLoad) setLoading(true);

        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE}/api/listings`, {
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch ministry listings: ${response.status}`,
          );
        }

        const data = await response.json();
        const listings = Array.isArray(data) ? data : [];

        if (!isMounted) return;

        setStats({
          pending: listings.filter(isPendingReview).length,
          approved: listings.filter(
            (listing) => normalizeStatus(listing) === "approved",
          ).length,
          rejected: listings.filter(
            (listing) => normalizeStatus(listing) === "rejected",
          ).length,
        });
        setRecentApprovals(listings.filter(isPendingReview).slice(0, 3));
        setError(null);
        setLastUpdated(new Date());
      } catch (err) {
        if (err.name === "AbortError") return;
        if (!isMounted) return;

        console.error("Failed to load live dashboard data:", err);
        setError("Unable to reach the server. Retrying shortly…");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDashboardListings(true);

    const intervalId = setInterval(() => {
      fetchDashboardListings(false);
    }, REFRESH_INTERVAL_MS);

    return () => {
      isMounted = false;
      controller.abort();
      clearInterval(intervalId);
    };
  }, [isPendingReview, normalizeStatus]);

  const statCards = [
    {
      label: "Pending Approvals",
      value: stats.pending,
      icon: Clock,
      bg: "bg-orange-50",
      text: "text-orange-600",
    },
    {
      label: "Approved Listings",
      value: stats.approved,
      icon: CheckCircle,
      bg: "bg-green-50",
      text: "text-green-600",
    },
    {
      label: "Rejected Listings",
      value: stats.rejected,
      icon: XCircle,
      bg: "bg-red-50",
      text: "text-red-600",
    },
  ];

  return (
    <main className="p-8 md:p-12 max-w-7xl mx-auto">
      <div className="mb-12">
        <div className="flex items-start justify-between flex-wrap gap-2">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">
              Ministry Dashboard
            </h1>
            <p className="text-gray-500 font-medium text-lg">
              Overview of platform activity, listings, and pending review queue.
            </p>
          </div>
          {!loading && lastUpdated && (
            <div className="flex items-center gap-2 text-sm text-gray-400 font-medium mt-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Live • updated {lastUpdated.toLocaleTimeString()}
            </div>
          )}
        </div>

        {error && (
          <p className="mt-3 inline-flex items-center gap-2 bg-red-50 text-red-700 border border-red-200 text-sm font-bold px-3 py-1 rounded-lg">
            <AlertTriangle size={16} /> {error}
          </p>
        )}
      </div>

      {loading ? (
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0, 1, 2].map((idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm animate-pulse"
              >
                <div className="h-4 w-32 bg-gray-200 rounded mb-4" />
                <div className="h-10 w-20 bg-gray-200 rounded" />
              </div>
            ))}
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm animate-pulse">
            <div className="flex justify-between items-center mb-6">
              <div className="h-7 w-40 bg-gray-200 rounded" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
            </div>
            <div className="space-y-4">
              {[0, 1, 2].map((idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="h-12 w-12 bg-gray-200 rounded-lg" />
                  <div className="flex-1 space-y-3">
                    <div className="h-4 w-1/2 bg-gray-200 rounded" />
                    <div className="h-3 w-2/3 bg-gray-200 rounded" />
                  </div>
                  <div className="h-10 w-32 bg-gray-200 rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
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
                <CheckCircle
                  className="mx-auto text-green-500 mb-3"
                  size={40}
                />
                <p className="font-bold text-lg text-gray-900">
                  All caught up!
                </p>
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
                          {typeof approval.location === "object"
                            ? approval.location.address ||
                              approval.location.city
                            : approval.location}{" "}
                          • {approval.acres} acres • {approval.price}
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
        </>
      )}
    </main>
  );
}
