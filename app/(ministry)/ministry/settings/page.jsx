"use client";
import { Save, Bell, Shield, Database } from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Settings saved successfully.");
    }, 1000);
  };

  return (
    <main className="p-8 md:p-12 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">
          System Settings
        </h1>
        <p className="text-gray-500 font-medium text-lg">
          Configure platform rules, notification preferences, and internal
          ministry settings.
        </p>
      </div>

      <div className="space-y-6">
        {/* Verification Settings */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center gap-3">
            <Shield className="text-blue-500" size={24} />
            <h2 className="text-xl font-bold text-gray-900">
              Verification Engine
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900">
                  Auto-Approve Low Risk
                </h4>
                <p className="text-sm text-gray-500">
                  Automatically approve plots under 10 acres that match existing
                  municipal records.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="border-t border-gray-100 my-4"></div>
            <div>
              <label className="block font-semibold text-gray-900 mb-1">
                Max Documents per Filing
              </label>
              <input
                type="number"
                defaultValue="15"
                className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center gap-3">
            <Bell className="text-orange-500" size={24} />
            <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900">
                  Daily Digest Email
                </h4>
                <p className="text-sm text-gray-500">
                  Receive a 9 AM summary of all pending approvals.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div>
                <h4 className="font-semibold text-gray-900">
                  Expedited Request Alerts
                </h4>
                <p className="text-sm text-gray-500">
                  Instant notification when an owner requests fast-tracked
                  processing.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-[#0f0f11] text-[#9afb21] hover:bg-black font-bold px-6 py-3 rounded-xl transition-colors disabled:opacity-70"
          >
            {isSaving ? (
              "Saving..."
            ) : (
              <>
                <Save size={20} /> Save Configuration
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
