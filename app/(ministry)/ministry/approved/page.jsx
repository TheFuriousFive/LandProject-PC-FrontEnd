"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Eye, Search, AlertTriangle } from "lucide-react";

export default function ApprovedListings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const allListings = JSON.parse(
      localStorage.getItem("land_listings") || "[]",
    );
    setListings(allListings.filter((l) => l.status === "approved"));
  }, []);

  const handleRevoke = (id) => {
    if (confirm("Are you sure you want to revoke this approval?")) {
      const allListings = JSON.parse(
        localStorage.getItem("land_listings") || "[]",
      );
      const updated = allListings.map((l) =>
        l.id === id ? { ...l, status: "pending" } : l,
      );
      localStorage.setItem("land_listings", JSON.stringify(updated));
      setListings(listings.filter((l) => l.id !== id));

      const targetListing = allListings.find((l) => l.id === id);
      const logs = JSON.parse(localStorage.getItem("owner_logs") || "[]");
      logs.unshift({
        // eslint-disable-next-line react-hooks/purity
        id: Date.now(),
        action: "Approval Revoked by Ministry",
        target: targetListing.title,
        date: new Date().toISOString(),
      });
      localStorage.setItem("owner_logs", JSON.stringify(logs));
    }
  };

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Approved Listings
          </h1>
          <p className="text-gray-500 font-medium">
            Verified properties currently active on the marketplace.
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="border-b border-gray-200 p-4 bg-gray-50 flex gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by title, location or owner..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:ring-[#9afb21] focus:border-[#9afb21] outline-none"
            />
          </div>
        </div>

        {listings.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <CheckCircle className="mx-auto text-gray-300 mb-4" size={48} />
            <p>No approved listings found.</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-bold text-gray-700 text-sm uppercase">
                  Listing Details
                </th>
                <th className="px-6 py-4 font-bold text-gray-700 text-sm uppercase">
                  Location
                </th>
                <th className="px-6 py-4 font-bold text-gray-700 text-sm uppercase">
                  Owner ID
                </th>
                <th className="px-6 py-4 font-bold text-gray-700 text-sm uppercase text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {listings.map((land) => (
                <tr
                  key={land.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900">{land.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {land.acres} Acres • {land.price} • {land.zoning}
                    </p>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-700">
                    {land.location}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-700">
                    {land.ownerId}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <button
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                        title="View Property"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleRevoke(land.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                        title="Revoke Approval"
                      >
                        <AlertTriangle size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
