"use client";

import { Save, Bell, Shield, Database } from "lucide-react";

export default function MinistrySettings() {
  return (
    <div className="p-8 md:p-12 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Platform Settings
        </h1>
        <p className="text-gray-500 font-medium">
          Configure global platform rules and your admin preferences.
        </p>
      </div>

      <div className="space-y-8">
        {/* Global Notifications */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
            <Bell className="text-blue-500" /> Notifications
          </h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
              <div>
                <p className="font-bold text-gray-900">
                  Email Alerts for New Submissions
                </p>
                <p className="text-sm text-gray-500">
                  Receive an email every time an owner submits a new listing.
                </p>
              </div>
              <input
                type="checkbox"
                className="w-5 h-5 accent-[#9afb21]"
                defaultChecked
              />
            </label>
            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
              <div>
                <p className="font-bold text-gray-900">Daily Summary Digest</p>
                <p className="text-sm text-gray-500">
                  Get a daily summary of approvals, rejections, and pending
                  items.
                </p>
              </div>
              <input
                type="checkbox"
                className="w-5 h-5 accent-[#9afb21]"
                defaultChecked
              />
            </label>
          </div>
        </section>

        {/* Security Rules */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
            <Shield className="text-green-500" /> Auto-Approval Rules
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block font-bold text-gray-700 text-sm mb-2">
                Maximum Land Price for Instant Verification (if available)
              </label>
              <select className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm font-medium rounded-xl px-4 py-3 focus:ring-[#9afb21] outline-none">
                <option>Disabled (Manual Review for All)</option>
                <option>Up to $50,000</option>
                <option>Up to $100,000</option>
              </select>
            </div>
            <p className="text-sm text-gray-500 bg-blue-50 text-blue-800 p-4 rounded-xl border border-blue-100">
              For security, the Ministry requires manual reviews for all
              listings. Updating these rules requires supervisor permission.
            </p>
          </div>
        </section>

        {/* System Settings */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
            <Database className="text-purple-500" /> Data Management
          </h2>
          <div className="flex gap-4">
            <button className="bg-white border-2 border-gray-200 text-gray-700 font-bold px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
              Export All Data (CSV)
            </button>
            <button className="bg-red-50 text-red-600 font-bold px-5 py-2.5 rounded-xl hover:bg-red-100 transition-colors border border-red-200">
              Clear Archive Logs
            </button>
          </div>
        </section>

        <div className="flex justify-end">
          <button className="bg-[#0f0f11] text-[#9afb21] font-bold px-8 py-3 rounded-xl hover:bg-black transition-colors flex items-center gap-2 shadow-md">
            <Save size={18} /> Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
