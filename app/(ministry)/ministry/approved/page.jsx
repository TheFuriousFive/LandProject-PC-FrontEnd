"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Eye, Search, AlertTriangle } from "lucide-react";
import BackButton from "@/_components/BackButton";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const normalizeStatus = (listing) =>
  String(
    listing?.status ||
      listing?.verification_status ||
      listing?.verificationStatus ||
      "",
  ).toLowerCase();

const isApproved = (listing) => normalizeStatus(listing) === "approved";

const getStoredAuthenticatorId = () => {
  try {
    const rawUser = localStorage.getItem("user");
    if (!rawUser) return null;

    const user = JSON.parse(rawUser);

    return (
      user?.id ||
      user?.userId ||
      user?.authenticatorId ||
      user?.user?.id ||
      user?.user?.userId ||
      user?.user?.authenticatorId ||
      null
    );
  } catch {
    return null;
  }
};

export default function ApprovedListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApprovedListingsFromApi = async (token) => {
    try {
      const response = await fetch(`${API_BASE}/api/listings/approved`, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!response.ok) return null;

      const data = await response.json();
      const records = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
          ? data.data
          : [];

      return records;
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    const loadApprovedListings = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      const apiListings = await fetchApprovedListingsFromApi(token);

      if (apiListings !== null) {
        // Backend already scopes this to approved-only, but filter
        // defensively in case the response ever mixes statuses.
        setListings(apiListings.filter(isApproved));
      } else {
        // Fallback to whatever was cached locally if the backend call fails.
        const allListings = JSON.parse(
          localStorage.getItem("land_listings") || "[]",
        );
        setListings(allListings.filter(isApproved));
      }
      setLoading(false);
    };

    loadApprovedListings();
  }, []);

  const handleRevoke = async (id) => {
    if (!confirm("Are you sure you want to revoke this approval?")) return;

    const authenticatorId = getStoredAuthenticatorId();

    if (!authenticatorId) {
      alert(
        "Unable to identify the signed-in authenticator. Please sign in again.",
      );
      return;
    }

    const targetListing = listings.find((l) => l.id === id);

    // Optimistically remove from the approved view.
    setListings((prev) => prev.filter((l) => l.id !== id));

    // Keep localStorage cache consistent for any pages still reading it.
    const allListings = JSON.parse(
      localStorage.getItem("land_listings") || "[]",
    );
    const updated = allListings.map((l) =>
      l.id === id
        ? {
            ...l,
            status: "PENDING",
            verification_status: "PENDING_VERIFICATION",
            verificationStatus: "PENDING_VERIFICATION",
          }
        : l,
    );
    localStorage.setItem("land_listings", JSON.stringify(updated));

    const logs = JSON.parse(localStorage.getItem("owner_logs") || "[]");
    logs.unshift({
      id: `${id}-revoke-${logs.length + 1}`,
      action: "Approval Revoked by Ministry",
      target: targetListing?.title || "Unknown listing",
      date: new Date().toISOString(),
    });
    localStorage.setItem("owner_logs", JSON.stringify(logs));

    // Push the revocation to the backend so it's reflected as REJECTED
    // (the schema only supports PENDING_VERIFICATION / APPROVED / REJECTED).
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE}/api/listings/verify-land`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          listingId: id,
          landListingId: id,
          approved: false,
          authenticatorId,
        }),
      });

      if (!response.ok) {
        console.warn(
          "Backend did not confirm revocation; local state was updated optimistically.",
        );
      }
    } catch (error) {
      console.warn(
        "Backend request failed, but the local listing state was already updated:",
        error,
      );
    }
  };

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto">
      <div className="mb-6">
        <BackButton />
      </div>
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

        {loading ? (
          <div className="p-12 text-center text-gray-500">
            <p>Loading approved listings...</p>
          </div>
        ) : listings.length === 0 ? (
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
                    {typeof land.location === "object" && land.location !== null
                      ? `${land.location.city || ""}, ${land.location.state || ""}`
                      : land.location}
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
