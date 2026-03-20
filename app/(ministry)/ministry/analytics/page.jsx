"use client";

import { BarChart3, TrendingUp, Users, Activity } from "lucide-react";
import BackButton from "@/_components/BackButton";

export default function MinistryAnalytics() {
  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto">
      <div className="mb-6">
        <BackButton />
      </div>
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Analytics
        </h1>
        <p className="text-gray-500 font-medium">
          Platform insights and real estate activity metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 text-gray-500 mb-4">
            <TrendingUp size={20} className="text-blue-500" />
            <p className="font-bold text-sm uppercase">Total Volume</p>
          </div>
          <p className="text-3xl font-extrabold text-gray-900">$45.2M</p>
          <p className="text-sm font-bold text-green-600 mt-2">
            +12.5% this month
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 text-gray-500 mb-4">
            <Activity size={20} className="text-purple-500" />
            <p className="font-bold text-sm uppercase">Active Listings</p>
          </div>
          <p className="text-3xl font-extrabold text-gray-900">1,248</p>
          <p className="text-sm font-bold text-green-600 mt-2">
            +54 new this week
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 text-gray-500 mb-4">
            <Users size={20} className="text-orange-500" />
            <p className="font-bold text-sm uppercase">Registered Investors</p>
          </div>
          <p className="text-3xl font-extrabold text-gray-900">8,942</p>
          <p className="text-sm font-bold text-green-600 mt-2">
            +320 this month
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 text-gray-500 mb-4">
            <BarChart3 size={20} className="text-green-500" />
            <p className="font-bold text-sm uppercase">Avg Approval Time</p>
          </div>
          <p className="text-3xl font-extrabold text-gray-900">1.2 Days</p>
          <p className="text-sm font-bold text-green-600 mt-2">
            -0.4 days improvement
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm min-h-[400px] flex flex-col justify-center items-center text-gray-400">
          <BarChart3 size={48} className="mb-4 text-gray-300" />
          <p className="font-bold text-lg text-gray-900 mb-1">
            Monthly Submissions Chart
          </p>
          <p className="text-sm">
            Chart integration placeholder (e.g. Chart.js, Recharts)
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm min-h-[400px] flex flex-col justify-center items-center text-gray-400">
          <Activity size={48} className="mb-4 text-gray-300" />
          <p className="font-bold text-lg text-gray-900 mb-1">
            Zoning Distribution Chart
          </p>
          <p className="text-sm">
            Chart integration placeholder (e.g. Chart.js, Recharts)
          </p>
        </div>
      </div>
    </div>
  );
}
