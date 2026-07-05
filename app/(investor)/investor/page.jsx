"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Compass,
  FileText,
  Heart,
  MapPin,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import BackButton from "@/_components/BackButton";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const REFRESH_INTERVAL_MS = 15000;

const STATUS_LABELS = {
  under_review: { label: "Under Review", cls: "text-blue-600 bg-blue-50" },
  approved: { label: "Approved", cls: "text-green-600 bg-green-50" },
  rejected: { label: "Rejected", cls: "text-red-600 bg-red-50" },
  offer_made: { label: "Offer Made", cls: "text-orange-600 bg-orange-50" },
};

export default function InvestorDashboard() {
  const [stats, setStats] = useState({
    savedListings: 0,
    activeOffers: 0,
    contracts: 0,
    avgPricePerAcre: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async (isInitialLoad, signal) => {
    try {
      if (isInitialLoad) setLoading(true);

      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE}/api/investor/dashboard`, {
        signal,
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch investor dashboard: ${response.status}`,
        );
      }

      const data = await response.json();

      setStats({
        savedListings: data?.stats?.savedListings ?? 0,
        activeOffers: data?.stats?.activeOffers ?? 0,
        contracts: data?.stats?.contracts ?? 0,
        avgPricePerAcre: data?.stats?.avgPricePerAcre ?? 0,
      });
      setRecentActivity(
        Array.isArray(data?.recentActivity) ? data.recentActivity : [],
      );
      setError(null);
    } catch (err) {
      if (err.name === "AbortError") return;
      console.error("Failed to load investor dashboard data:", err);
      setError("Unable to reach the server. Retrying shortly…");
    } finally {
      if (isInitialLoad) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetchDashboard(true, controller.signal);
    const intervalId = setInterval(() => {
      fetchDashboard(false, controller.signal);
    }, REFRESH_INTERVAL_MS);

    return () => {
      controller.abort();
      clearInterval(intervalId);
    };
  }, [fetchDashboard]);

  const kpiCards = [
    {
      label: "Saved Listings",
      value: stats.savedListings,
      icon: Heart,
    },
    {
      label: "Active Offers",
      value: stats.activeOffers,
      icon: TrendingUp,
    },
    {
      label: "Contracts",
      value: stats.contracts,
      icon: FileText,
    },
  ];

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto">
      <div className="mb-6">
        <BackButton />
      </div>
      <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
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

      {error && (
        <p className="mb-6 inline-flex items-center gap-2 bg-red-50 text-red-700 border border-red-200 text-sm font-bold px-3 py-1 rounded-lg">
          <AlertTriangle size={16} /> {error}
        </p>
      )}

      {loading ? (
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-pulse"
              >
                <div className="h-5 w-24 bg-gray-200 rounded mb-4" />
                <div className="h-9 w-16 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 animate-pulse">
            <div className="h-7 w-40 bg-gray-200 rounded mb-6" />
            <div className="space-y-4">
              {[0, 1, 2].map((idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="w-16 h-16 bg-gray-200 rounded-lg" />
                  <div className="flex-1 space-y-3">
                    <div className="h-4 w-1/2 bg-gray-200 rounded" />
                    <div className="h-3 w-1/3 bg-gray-200 rounded" />
                  </div>
                  <div className="h-10 w-28 bg-gray-200 rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {kpiCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between"
                >
                  <div className="flex items-center gap-3 text-gray-500 mb-4">
                    <Icon size={20} />
                    <p className="font-semibold">{card.label}</p>
                  </div>
                  <p className="text-4xl font-bold text-gray-900">
                    {card.value}
                  </p>
                </div>
              );
            })}
            <div className="bg-[#9afb21] p-6 rounded-2xl shadow-sm border border-[#8bed1c] flex flex-col justify-between">
              <div className="flex items-center gap-3 text-[#0f0f11] mb-4">
                <MapPin size={20} />
                <p className="font-semibold">Avg. Price / Acre</p>
              </div>
              <p className="text-4xl font-bold text-[#0f0f11]">
                ${stats.avgPricePerAcre.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Recent Activity
            </h2>

            {recentActivity.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="font-bold text-lg text-gray-900">
                  Nothing here yet
                </p>
                <p>Your saved listings and offers will show up here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((item) => {
                  const status = STATUS_LABELS[item.status] || {
                    label: item.status,
                    cls: "text-gray-600 bg-gray-100",
                  };
                  return (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                          {item.imageUrl && (
                            <img
                              src={item.imageUrl}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-500 font-medium">
                            {typeof item.location === "object"
                              ? item.location.address || item.location.city
                              : item.location}{" "}
                            • {item.acres} Acres
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="text-left sm:text-right">
                          <p className="font-bold text-gray-900 text-lg">
                            ${Number(item.price).toLocaleString()}
                          </p>
                          <p
                            className={`text-xs font-semibold px-2 py-1 rounded inline-block mt-1 ${status.cls}`}
                          >
                            {status.label}
                          </p>
                        </div>
                        <Link
                          href={`/property/${item.id}`}
                          className="bg-white border border-gray-200 text-sm font-bold px-4 py-2 rounded-lg hover:border-gray-900 transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
