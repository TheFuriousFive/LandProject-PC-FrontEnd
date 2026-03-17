"use client";

import { useEffect, useState } from "react";
import { Check, X, FileText, AlertCircle } from "lucide-react";

export default function PendingApprovals() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const allListings = JSON.parse(
      localStorage.getItem("land_listings") || "[]",
    );
    setListings(allListings.filter((l) => l.status === "pending"));
  }, []);

  const handleAction = (id, action) => {
    if (confirm(`Are you sure you want to ${action} this listing?`)) {
      const allListings = JSON.parse(
        localStorage.getItem("land_listings") || "[]",
      );
      const updated = allListings.map((l) =>
        l.id === id ? { ...l, status: action } : l,
      );

      localStorage.setItem("land_listings", JSON.stringify(updated));
      setListings(listings.filter((l) => l.id !== id));

      // We could add to owner logs here, mocking a backend trigger
      const logs = JSON.parse(localStorage.getItem("owner_logs") || "[]");
      const targetListing = allListings.find((l) => l.id === id);
      const logAction =
        action === "approved" ? "Approved by Ministry" : "Rejected by Ministry";
      logs.unshift({
        // eslint-disable-next-line react-hooks/purity
        id: Date.now(),
        action: logAction,
        target: targetListing.title,
        date: new Date().toISOString(),
      });
      localStorage.setItem("owner_logs", JSON.stringify(logs));
    }
  };

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Pending Approvals
        </h1>
        <p className="text-gray-500 font-medium">
          Review and verify new land listing submissions.
        </p>
      </div>

      <div className="space-y-6">
        {listings.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
            <Check className="mx-auto text-green-500 mb-4" size={48} />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No pending approvals
            </h3>
            <p className="text-gray-500">
              The review queue is currently empty.
            </p>
          </div>
        ) : (
          listings.map((land) => (
            <div
              key={land.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col lg:flex-row justify-between gap-6"
            >
              <div className="flex gap-6 flex-1">
                <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center shrink-0">
                  <FileText size={32} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold text-gray-900">
                      {land.title}
                    </h3>
                    <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2.5 py-1 rounded-lg">
                      AWAITING REVIEW
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">
                    Submitted by:{" "}
                    <span className="font-semibold text-gray-700">
                      {land.ownerId}
                    </span>
                  </p>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div>
                      <p className="text-gray-500 font-semibold mb-1">
                        Location
                      </p>
                      <p className="font-bold text-gray-900">{land.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-semibold mb-1">Size</p>
                      <p className="font-bold text-gray-900">
                        {land.acres} Acres
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-semibold mb-1">Price</p>
                      <p className="font-bold text-gray-900">{land.price}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-semibold mb-1">Zoning</p>
                      <p className="font-bold text-gray-900">
                        {land.zoning || "N/A"}
                      </p>
                    </div>
                  </div>

                  {land.description && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <p className="text-sm font-semibold text-gray-500 mb-1">
                        Description
                      </p>
                      <p className="text-sm text-gray-800">
                        {land.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3 justify-center lg:w-48 lg:border-l lg:border-gray-100 lg:pl-6 shrink-0">
                <button
                  onClick={() => handleAction(land.id, "approved")}
                  className="w-full bg-[#9afb21] text-[#0f0f11] font-bold px-4 py-3 rounded-xl hover:bg-[#8bed1c] transition-colors flex items-center justify-center gap-2"
                >
                  <Check size={18} /> Approve
                </button>
                <button
                  onClick={() => handleAction(land.id, "rejected")}
                  className="w-full bg-white border-2 border-red-500 text-red-600 font-bold px-4 py-3 rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                >
                  <X size={18} /> Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
