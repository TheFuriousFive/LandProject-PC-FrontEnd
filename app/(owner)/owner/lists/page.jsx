"use client";
import { Plus, Trash2, Edit2, Clock, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { useListings } from "../../_components/useListings";

export default function MyAds() {
  const { listings, removeListing } = useListings();

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
            <CheckCircle size={14} /> Approved
          </span>
        );
      case "rejected":
        return (
          <span className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
            <XCircle size={14} /> Rejected
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">
            <Clock size={14} /> Pending
          </span>
        );
    }
  };

  return (
    <main className="p-8 md:p-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">
            My Land Ads
          </h1>
          <p className="text-gray-500 font-medium text-lg">
            Manage your land listings and track their approval status.
          </p>
        </div>
        <Link
          href="/owner/add-land"
          className="flex items-center gap-2 bg-[#0f0f11] text-[#9afb21] px-5 py-3 rounded-xl font-bold hover:bg-black transition-all flex-shrink-0"
        >
          <Plus size={20} />
          Post New Land
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.length === 0 ? (
          <div className="col-span-full bg-white p-12 text-center rounded-2xl border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Listings Yet
            </h3>
            <p className="text-gray-500 mb-6">
              You haven't posted any land ads. Start by adding a new one!
            </p>
            <Link
              href="/owner/add-land"
              className="inline-flex items-center gap-2 border-2 border-[#0f0f11] text-[#0f0f11] px-5 py-2.5 rounded-xl font-bold hover:bg-gray-50 transition-all"
            >
              <Plus size={18} /> Add First Listing
            </Link>
          </div>
        ) : (
          listings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="h-48 bg-gray-100 relative">
                {/* Mock image placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <span className="font-medium text-sm">Property Image</span>
                </div>
                <div className="absolute top-4 right-4 focus:outline-none">
                  {getStatusBadge(listing.status)}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3
                    className="text-xl font-bold text-gray-900 line-clamp-1"
                    title={listing.propertyTitle}
                  >
                    {listing.propertyTitle}
                  </h3>
                </div>
                <p className="text-[#0f0f11] font-bold text-lg mb-4">
                  {listing.price || "Price varies"}
                </p>

                <div className="space-y-2 text-sm text-gray-500 mb-6 flex-1">
                  <p>
                    <span className="font-semibold text-gray-700">
                      Location:
                    </span>{" "}
                    {listing.location}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Size:</span>{" "}
                    {listing.acres} acres
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Added:</span>{" "}
                    {listing.submittedDate}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold text-sm transition-colors">
                    <Edit2 size={16} /> Edit
                  </button>
                  <button
                    onClick={() => removeListing(listing.id)}
                    className="flex items-center gap-2 text-gray-600 hover:text-red-600 font-semibold text-sm transition-colors"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
